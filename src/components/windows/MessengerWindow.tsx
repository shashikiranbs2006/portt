import React, { useState, useRef, useEffect } from "react";
import { retroAudio } from "../../utils/audioSystem";
import { getStoredGroqKey, sendGroqChatMessage } from "../../utils/groqChat";

interface Message {
  from: "visitor" | "shashi";
  text: string;
  time: string;
  isError?: boolean;
}

const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const SHASHI_RESPONSES: Record<string, string[]> = {
  "hi|hello|hey|yo|sup": [
    "heyy!! welcome to MSN Messenger 👋 I'm Shashi — 3rd year CSE (AI/ML) @ BMSIT. Ask me anything about my projects, my KlarDataLabs internship, or hiring for Summer 2027!",
    "yo!! Glad you found the messenger! What are you looking to chat about? The Relay VS Code extension, Yoru Chatbot, Prompt Compiler, or my KlarDataLabs work?",
    "Yo! Welcome to the cyber deck 🌐 Feel free to ask about my shipped work, or hit the Nudge button!"
  ],
  "who are you|who r u|introduce yourself|bio": [
    "I'm Shashikiran B S! 3rd year CSE (AI/ML) at BMSIT, Bengaluru (CGPA 8.7/10). Currently interning at KlarDataLabs (Zurich, Remote) building agentic workflows with AWS Bedrock. Actively seeking Summer 2027 SWE Intern (AMTS) roles!",
    "Full-Stack & AI engineer from Bengaluru. I build developer tools, agentic workflows, extensions, and high-performance ML platforms!"
  ],
  "bmsit|college|cgpa|education|degree|gpa": [
    "I'm pursuing B.E. Computer Science & Engineering (AI/ML) at BMS Institute of Technology & Management (BMSIT), Bengaluru. Current CGPA: 8.7 / 10.0, graduating May 2028!",
    "BMSIT CSE (AI/ML) student with an 8.7 CGPA. Also serve as Treasurer of Coding Club and was Lead Organiser for NIRMAAN 2026."
  ],
  "klar|klardatalabs|zurich|internship|work experience": [
    "At KlarDataLabs (Zurich, Remote), I work on agent orchestration and developer tooling using the Strands Agents SDK integrated with AWS Bedrock. I build and test agent behavior against cloud-hosted backends before deployment.",
    "My KlarDataLabs internship focuses on agentic AI pipelines and validating LLM tools with strict CI/CD gates."
  ],
  "hire|job|intern|amts|recruiter|opportunity|role": [
    "Yes please! I am actively looking for Summer 2027 SWE Intern (AMTS) roles. My email is shashibs238@gmail.com — feel free to drop a note or send an offer!",
    "Let's talk! You can email me at shashibs238@gmail.com or call +91 7676104288. You can also send a fast-track SMS via the Motorola RAZR on the desktop!"
  ],
  "contact|email|phone|call|reach": [
    "You can reach me at:\n✉️ Email: shashibs238@gmail.com\n📞 Phone: +91 7676104288\n🐙 GitHub: github.com/shashikiranbs2006\n💼 LinkedIn: linkedin.com/in/shashikiran-bs",
    "Drop me an email at shashibs238@gmail.com or dial +91 7676104288 anytime!"
  ],
  "resume|cv|pdf": [
    "You can download my verified 1-page resume directly from /resume.pdf or click 'Download Resume' in the Meet The Artist window!",
    "Check out my resume at /resume.pdf — it highlights The Relay, Yoru Chatbot, Prompt Compiler, Credit Card Fraud Detection, and FitPhile."
  ],
  "relay|llm|agent|bedrock|router": [
    "Relay is an AI Coding Assistant I built with a priority queue request router over multiple LLM backends. When a provider gets rate-limited (HTTP 429), it automatically compresses active conversation context and hands off state to AWS Bedrock in ~118ms! Simulation live at relay-jofk.vercel.app.",
    "Relay is built as a VS Code extension with a deployed web simulation playground. Open the Projects window to launch it!"
  ],
  "edurag|yoru|rag|chromadb|retrieval": [
    "Yoru Chatbot (EduRAG) is a document retrieval microservice and educational assistant over 500+ pages of curriculum material. It uses ChromaDB for vector embeddings and BM25 reranking with a sub-2.0s SLA latency. Deployed live on Render at edu-rag.onrender.com!"
  ],
  "prompt|compiler|prompt compiler|chrome": [
    "Prompt Compiler is a Google Chrome extension & web tool that parses, structures, and compiles raw prompts into optimized LLM directives with token reduction (-34%) and XML templating! Simulation live at prompt-compiler-five.vercel.app.",
    "You can find Prompt Compiler in the Projects window and launch the live app directly!"
  ],
  "credit card|fraud|fraud detection|ml|machine learning": [
    "My Credit Card Fraud Detection platform uses machine learning (XGBoost, SMOTE, Scikit-Learn) to identify fraudulent transactions in imbalanced financial data. Deployed live on Streamlit Cloud at credit-card-fraud-detection-by-shashikiran.streamlit.app!"
  ],
  "fitphile|fitness|workout|nutrition": [
    "FitPhile is a full-stack health & workout tracking platform deployed live on Render at fitphile.onrender.com! It logs workout splits, tracks macronutrient telemetry, and monitors progress over time."
  ],
  "nirmaan|hackathon|bmsit": [
    "I was the Lead Organiser for NIRMAAN 2026, BMSIT's 24-hour flagship hackathon! Managed a ₹3,00,000 budget across 52 sponsor companies, 200+ participants, and ₹1,00,000 prize pool."
  ],
  "skills|stack|tech": [
    "Core stack: Python, TypeScript, React, FastAPI, PostgreSQL, SQL, AWS Bedrock, Strands Agents SDK, Scikit-Learn, ChromaDB, Docker, and Git."
  ],
  "default": [
    "Haha interesting question! Feel free to ask about The Relay, Yoru Chatbot, Prompt Compiler, Credit Card Fraud Detection, or FitPhile!",
    "Check out the live deployments in the Projects window or ping me at shashibs238@gmail.com ⚡",
    "Catch me on GitHub at github.com/shashikiranbs2006 or LinkedIn at linkedin.com/in/shashikiran-bs!"
  ]
};

function getShashiReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [pattern, replies] of Object.entries(SHASHI_RESPONSES)) {
    if (pattern === "default") continue;
    if (pattern.split("|").some((k) => lower.includes(k))) {
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
  const defaults = SHASHI_RESPONSES.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
}

const QUICK_PROMPTS = [
  "🤖 The Relay VS Code extension",
  "⚡ Prompt Compiler Chrome ext",
  "📚 Yoru Chatbot & EduRAG",
  "💼 Why hire for Summer 2027?",
  "🏷️ NIRMAAN 2026 Hackathon",
  "📄 How can I view your resume?",
  "📳 Send Nudge!"
];

export const MessengerWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "shashi",
      text: "heyyy!! you found MSN Messenger 👋 I'm Shashi's AI assistant powered by Groq Llama-3.3-70B. Ask me anything about my projects, my KlarDataLabs internship, tech stack, or hiring for Summer 2027!",
      time: getTime()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isNudging, setIsNudging] = useState(false);
  const [userStatus, setUserStatus] = useState<"online" | "busy" | "away">("online");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Directly read key from .env (VITE_GROQ_API_KEY)
  const groqKey = getStoredGroqKey();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendText = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase().includes("nudge")) {
      triggerNudge();
      return;
    }

    retroAudio.playClick(1.1);
    const visitorMsg: Message = { from: "visitor", text: trimmed, time: getTime() };
    const updatedMessages = [...messages, visitorMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    const activeKey = groqKey.trim();

    if (activeKey) {
      try {
        // Build history formatted for Groq API
        const historyForGroq = updatedMessages
          .filter((m) => !m.isError)
          .slice(-10)
          .map((m) => ({
            role: m.from === "visitor" ? ("user" as const) : ("assistant" as const),
            content: m.text
          }));

        const reply = await sendGroqChatMessage(historyForGroq, activeKey);
        setIsTyping(false);
        retroAudio.playMSNChime();
        setMessages((prev) => [...prev, { from: "shashi", text: reply, time: getTime() }]);
      } catch (err: unknown) {
        setIsTyping(false);
        retroAudio.playErrorChord();
        const errMessage = err instanceof Error ? err.message : "Failed to communicate with Groq API.";
        setMessages((prev) => [
          ...prev,
          {
            from: "shashi",
            text: `⚠️ Groq API Notice: ${errMessage}\n\nFalling back to offline simulated reply:`,
            time: getTime(),
            isError: true
          },
          {
            from: "shashi",
            text: getShashiReply(trimmed),
            time: getTime()
          }
        ]);
      }
    } else {
      // Offline fallback
      setTimeout(() => {
        const reply = getShashiReply(trimmed);
        setIsTyping(false);
        retroAudio.playMSNChime();
        setMessages((prev) => [...prev, { from: "shashi", text: reply, time: getTime() }]);
      }, 500);
    }
  };

  const triggerNudge = () => {
    retroAudio.playNudge();
    setIsNudging(true);
    setMessages((prev) => [
      ...prev,
      {
        from: "visitor",
        text: "⚡ Sent a Nudge!",
        time: getTime()
      }
    ]);
    setTimeout(() => {
      setIsNudging(false);
      retroAudio.playMSNChime();
      setMessages((prev) => [
        ...prev,
        {
          from: "shashi",
          text: "📳 *BUZZZZ!* Whoa, that was a heavy nudge! My window was literally vibrating haha! What's on your mind?",
          time: getTime()
        }
      ]);
    }, 700);
  };

  const clearChat = () => {
    retroAudio.playClick(0.9);
    setMessages([
      {
        from: "shashi",
        text: "Chat history cleared! What would you like to explore next?",
        time: getTime()
      }
    ]);
  };

  const cycleStatus = () => {
    retroAudio.playClick(1.05);
    setUserStatus((prev) => (prev === "online" ? "away" : prev === "away" ? "busy" : "online"));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#c0c0c0",
        fontFamily: "var(--font-body)",
        userSelect: "none",
        position: "relative",
        animation: isNudging ? "msn-shake 0.45s ease-in-out" : "none"
      }}
    >
      {/* MSN Header */}
      <div
        style={{
          background: "linear-gradient(90deg, #1a2d91 0%, #0080c0 100%)",
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#fff"
        }}
      >
        {/* Real Shashi Avatar photo */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #ffe500",
            flexShrink: 0,
            boxShadow: "0 0 6px rgba(0,0,0,0.5)"
          }}
        >
          <img
            src="/avatar.jpg"
            alt="Shashikiran B S"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = "none";
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Shashikiran B S</span>
            <button
              type="button"
              onClick={cycleStatus}
              title="Click to toggle status"
              style={{
                background: "transparent",
                border: "none",
                fontSize: "10px",
                color: userStatus === "online" ? "#39ff14" : userStatus === "away" ? "#ffe500" : "#ff4444",
                cursor: "pointer",
                padding: 0
              }}
            >
              ● {userStatus.toUpperCase()}
            </button>
          </div>
          <div style={{ color: "#cde", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            🟢 Live AI Active (Llama-3.3-70B) · AMTS 2027
          </div>
        </div>

        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          <button
            type="button"
            className="bevel-button"
            onClick={clearChat}
            style={{
              fontSize: "10px",
              padding: "2px 5px",
              cursor: "pointer"
            }}
            title="Clear Chat History"
          >
            🗑️
          </button>
          <button
            type="button"
            className="bevel-button"
            onClick={triggerNudge}
            style={{
              fontSize: "10px",
              padding: "2px 6px",
              backgroundColor: "#ffe500",
              color: "#000",
              fontWeight: "bold"
            }}
            title="Send MSN Nudge (Shake Screen)"
          >
            📳 NUDGE
          </button>
        </div>
      </div>

      {/* Mode status banner */}
      <div
        style={{
          backgroundColor: "#e6ffed",
          padding: "4px 8px",
          fontSize: "11px",
          borderBottom: "1px solid #c0c0c0",
          color: "#155724",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>
          ⚡ Live AI Chat enabled (Groq Llama 3.3 70B with GitHub & Project Knowledge)
        </span>
        <span style={{ color: "#008000", fontWeight: "bold", fontSize: "10px" }}>MSN v7.5</span>
      </div>

      {/* Messages Area */}
      <div
        className="bevel-sunken"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: msg.from === "visitor" ? "row-reverse" : "row",
              alignItems: "flex-end",
              gap: "6px"
            }}
          >
            {msg.from === "shashi" ? (
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid #ffe500",
                  flexShrink: 0
                }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Shashi"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c0c0c0, #808080)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  border: "1px solid #777"
                }}
              >
                👤
              </div>
            )}

            <div
              style={{
                maxWidth: "82%",
                display: "flex",
                flexDirection: "column",
                alignItems: msg.from === "visitor" ? "flex-end" : "flex-start"
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: "#888",
                  marginBottom: "2px",
                  fontFamily: "var(--font-pixel)"
                }}
              >
                {msg.from === "shashi" ? "shashikiran_bs" : "you"} · {msg.time}
              </div>
              <div
                style={{
                  backgroundColor: msg.isError
                    ? "#fff0f0"
                    : msg.from === "shashi"
                    ? "#e8f4fd"
                    : "#fff9e6",
                  border: `1px solid ${
                    msg.isError
                      ? "#f5c6cb"
                      : msg.from === "shashi"
                      ? "#bee3f8"
                      : "#ffe566"
                  }`,
                  borderRadius: msg.from === "shashi" ? "4px 12px 12px 4px" : "12px 4px 4px 12px",
                  padding: "6px 10px",
                  fontSize: "13px",
                  lineHeight: "1.45",
                  color: "#1a1a1a",
                  wordBreak: "break-word",
                  whiteSpace: "pre-line"
                }}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingLeft: "34px" }}>
            <span style={{ fontSize: "11px", color: "#666", fontStyle: "italic" }}>
              shashikiran_bs is typing... 💬
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Recruiter Quick Prompt Chips */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "4px 6px",
          backgroundColor: "#eaeaea",
          borderTop: "1px solid #c0c0c0",
          overflowX: "auto"
        }}
      >
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendText(prompt)}
            style={{
              whiteSpace: "nowrap",
              fontSize: "10px",
              padding: "2px 6px",
              backgroundColor: "#fff",
              border: "1px solid #999",
              cursor: "pointer",
              borderRadius: "2px",
              fontFamily: "var(--font-sans)"
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendText(input);
        }}
        style={{
          display: "flex",
          padding: "6px",
          gap: "6px",
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080"
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat with AI Shashi (Groq Llama 3.3)..."
          style={{
            flex: 1,
            padding: "4px 8px",
            fontSize: "12px",
            border: "1px solid #808080",
            outline: "none",
            backgroundColor: "#fff",
            fontFamily: "var(--font-sans)"
          }}
        />
        <button
          type="submit"
          className="bevel-button"
          style={{
            padding: "4px 12px",
            fontWeight: "bold",
            fontSize: "12px",
            backgroundColor: "#ffe500",
            color: "#000"
          }}
        >
          Send
        </button>
      </form>

      <style>{`
        @keyframes msn-shake {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-8px, 5px); }
          40% { transform: translate(8px, -5px); }
          60% { transform: translate(-5px, -4px); }
          80% { transform: translate(5px, 4px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};
