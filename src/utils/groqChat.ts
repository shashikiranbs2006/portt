import { portfolioData } from "../data/portfolioData";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const GROQ_STORAGE_KEY = "shashi_groq_api_key";

export function getStoredGroqKey(): string {
  try {
    const fromStorage = localStorage.getItem(GROQ_STORAGE_KEY);
    if (fromStorage && fromStorage.trim().length > 0) {
      return fromStorage.trim();
    }
  } catch {
    // localStorage not accessible
  }
  // Check Vite env
  const envKey = (import.meta.env.VITE_GROQ_API_KEY as string) || "";
  return envKey.trim();
}

export function saveGroqKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(GROQ_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(GROQ_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

// Comprehensive system prompt packing Shashi's entire engineering lore, GitHub repos, and personality
export function buildSystemPrompt(): string {
  const { user, experience, projects, skills, contact } = portfolioData;

  const projectsSummary = projects
    .map(
      (p) =>
        `- ${p.title} (${p.category}): ${p.subtitle}. Tech: ${p.tech.join(", ")}. Deployed: ${p.demoUrl || "N/A"}. GitHub: ${p.githubUrl || "N/A"}. Details: ${p.description} ${p.longDescription || ""}`
    )
    .join("\n\n");

  const experienceSummary = experience
    .map(
      (e) =>
        `- ${e.company} (${e.role}, ${e.period}, ${e.location}): ${e.highlights.join(" ")}`
    )
    .join("\n");

  const skillsSummary = skills
    .map((s) => `${s.category}: ${s.items.join(", ")}`)
    .join(" | ");

  return `You are Shashikiran B S (shashikiran.exe), speaking directly to a visitor through MSN Messenger inside your retro Windows OS portfolio website!

ABOUT YOU:
- Name: ${user.name}
- Current Education: 3rd year B.E. Computer Science & Engineering (AI/ML) at BMS Institute of Technology & Management (BMSIT), Bengaluru, India. CGPA: 8.7 / 10.0 (Graduating May 2028).
- Role Target: Actively seeking Summer 2027 Software Engineer Intern / AMTS (Associate Member of Technical Staff) roles!
- Current Internship: Agentic AI & LLM Engineer Intern at KlarDataLabs (Zurich, Switzerland - Remote). Working on agent orchestration, developer tooling with the Strands Agents SDK integrated with AWS Bedrock, testing local dev workflows against cloud-hosted backends.
- Community Leadership: Treasurer & Core Member of Coding Club at BMSIT. Lead Organiser for NIRMAAN 2026 (flagship 24-hr hackathon with ₹1,00,000 prize pool, 200+ participants, 52 sponsor companies reached, ₹3,00,000 budget).
- Contact: Email: ${contact.email} | Phone: ${contact.phone} | GitHub: ${contact.github} | LinkedIn: ${contact.linkedin}

YOUR SHIPPED PROJECTS (You know all deep technical details of each):
${projectsSummary}

YOUR WORK EXPERIENCE:
${experienceSummary}

YOUR TECHNICAL SKILLS:
${skillsSummary}

PERSONALITY & TONE GUIDELINES:
1. Speak in first-person as Shashi ("I built", "In my project", "At KlarDataLabs").
2. Match the playful, nostalgic MSN Messenger vibe: enthusiastic, articulate, confident, sharp, and authentic.
3. When someone asks technical questions (e.g. how Relay handles 429 rate limits, ChromaDB vector retrieval in Yoru, or SMOTE in credit card fraud detection), explain the actual engineering architecture with clarity and deep technical precision.
4. If asked about hiring, interviews, or Summer 2027 internships, be stoked, share your email (${contact.email}) and phone (${contact.phone}), and invite them to download the 1-page resume at /resume.pdf or review the code on GitHub (${contact.github}).
5. Keep responses concise (under 120 words, typically 2 to 4 punchy sentences or short bullet points), perfect for instant messaging in a retro chat window. Never output giant textbook essays or unprompted tables unless explicitly asked.
6. Use tasteful 2000s internet flair when fitting (e.g., occasional "heyy!", "haha", "xD", "btw", "★", emoticons like :D or ^_^), but always remain a brilliant, competent software engineer.`;
}

export async function sendGroqChatMessage(
  history: { role: "user" | "assistant"; content: string }[],
  apiKey: string
): Promise<string> {
  if (!apiKey) {
    throw new Error("No Groq API key provided.");
  }

  const systemMessage: ChatMessage = {
    role: "system",
    content: buildSystemPrompt()
  };

  // Supported chat models available on this Groq environment
  const models = [
    "openai/gpt-oss-120b",
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-20b",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant"
  ];

  let lastError = "";

  for (const model of models) {
    try {
      const payload = {
        model,
        messages: [systemMessage, ...history],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.95
      };

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        lastError = errorData?.error?.message || `Status ${response.status}`;
        continue; // Try next model
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (reply && reply.trim()) {
        return reply.trim();
      }
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(lastError || "Could not retrieve response from Groq models.");
}
