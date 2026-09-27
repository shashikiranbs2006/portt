import React, { useState, useRef, useEffect } from "react";
import { retroAudio } from "../../utils/audioSystem";

interface Message {
  from: "visitor" | "shashi";
  text: string;
  time: string;
}

const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const SHASHI_RESPONSES: Record<string, string[]> = {
  "hi|hello|hey|yo|sup": [
    "hey!! welcome to MSN Messenger lol. I'm Shashi — 3rd year CSE (AI/ML) @ BMSIT 👋 Ask me anything about my projects, internship, or tech stack!",
    "heyyy!! glad you found the messenger. What are you looking to chat about? Internships, backend architecture, or hackathons?",
    "Yo! Welcome to the cyber deck 🌐 Feel free to ask about my shipped work or hit the Nudge button!"
  ],
  "who are you|who r u|introduce yourself|bio": [
    "I'm Shashikiran B S! 3rd year CSE (AI/ML) at BMSIT, Bengaluru (CGPA 8.7/10). Currently interning at KlarDataLabs (Zurich, Remote) building agentic workflows with AWS Bedrock. Seeking Summer 2027 SWE Intern (AMTS) roles!",
    "Backend & Agentic AI engineer. I build multi-tenant query systems by day and retro OS gig-poster portfolios by night!"
  ],
  "hire|job|internship|opportunity|amts|recruiter": [
    "Yes please! I am actively looking for Summer 2027 SWE Intern (AMTS) roles. My email is shashibs238@gmail.com — feel free to drop a note or send an offer!",
    "Let's talk! You can email me at shashibs238@gmail.com or call +91 7676104288. You can also send a fast-track SMS via the Motorola RAZR on the desktop!"
  ],
  "multi-tenant|ticket|postgres|database": [
    "My Multi-Tenant Ticketing Platform is built on FastAPI & PostgreSQL with a shared-schema model across 9 relational tables. Tenant isolation happens at the query-builder level via request-scoped org_id. Tested using Testcontainers in CI so cross-tenant leakage fails by construction!",
    "Check out the interactive simulator in the Projects window! You can toggle cross-tenant attacks and see the 403 Forbidden query guard in action."
  ],
  "relay|llm|agent|bedrock|router": [
    "Relay is an AI Coding Assistant I built with a priority queue request router over multiple LLM backends. When a provider gets rate-limited (HTTP 429), it automatically compresses active conversation context and hands off state to AWS Bedrock in ~118ms!"
  ],
  "edurag|rag|chromadb|retrieval": [
    "EduRAG is a document retrieval microservice over 500+ pages of curriculum material. It uses ChromaDB for vector embeddings and BM25 reranking with a sub-2.0s SLA latency."
  ],
  "nirmaan|hackathon|bmsit": [
    "I was the Lead Organiser for NIRMAAN 2026, BMSIT's 24-hour flagship hackathon! Managed a ₹3,00,000 budget across 52 sponsor companies, 200+ participants, and ₹1,00,000 prize pool."
  ],
  "skills|stack|tech": [
    "Core stack: Python, FastAPI, PostgreSQL, SQL, TypeScript, React, Docker, Testcontainers, AWS Bedrock, Strands Agents SDK, and pytest."
  ],
  "nudge": [
    "📳 *BUZZZZ!* Whoa, that was a heavy nudge! I'm awake, I'm awake!"
  ],
  "default": [
    "Haha interesting question! Feel free to ask about my Multi-Tenant Ticketing Platform, Relay AI router, or email me directly at shashibs238@gmail.com!",
    "That's cool! Check out the interactive playgrounds in the Projects window or ping me at shashibs238@gmail.com ⚡",
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
  "🏢 Tell me about Multi-Tenant platform",
  "⚡ How does Relay LLM router work?",
  "💼 Why should we hire you for Summer 2027?",
  "🏷️ Tell me about NIRMAAN 2026",
  "📳 Send Nudge!"
];

export const MessengerWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "shashi",
      text: "heyyy!! you found MSN Messenger 👋 Ask me anything about my projects, my KlarDataLabs internship, or hiring for Summer 2027!",
      time: getTime()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isNudging, setIsNudging] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendText = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase().includes("nudge")) {
      triggerNudge();
      return;
    }

    retroAudio.playClick(1.1);
    const visitorMsg: Message = { from: "visitor", text: trimmed, time: getTime() };
    setMessages((prev) => [...prev, visitorMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getShashiReply(trimmed);
      setIsTyping(false);
      retroAudio.playClick(1.3);
      setMessages((prev) => [...prev, { from: "shashi", text: reply, time: getTime() }]);
    }, 700 + Math.random() * 800);
  };

  const triggerNudge = () => {
    retroAudio.playErrorChord();
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
      setMessages((prev) => [
        ...prev,
        {
          from: "shashi",
          text: "📳 *BUZZZZ!* Whoa, you just sent a nudge! Screen is shaking lmaooo",
          time: getTime()
        }
      ]);
    }, 600);
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
        animation: isNudging ? "msn-shake 0.4s ease-in-out" : "none"
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
        {/* Shashi Avatar */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ffe500, #ff3b30)",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          ⚡
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "13px" }}>Shashikiran B S</div>
          <div style={{ color: "#cde", fontSize: "11px" }}>
            🟢 Online — Agentic AI Intern @ KlarDataLabs · AMTS 2027
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
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

      {/* Status banner */}
      <div
        style={{
          backgroundColor: "#fffff0",
          padding: "4px 8px",
          fontSize: "11px",
          borderBottom: "1px solid #c0c0c0",
          color: "#444",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <span>💡 Ask about multi-tenant architecture, LLM routers, or internships!</span>
        <span style={{ color: "#008000", fontWeight: "bold" }}>MSN v7.5</span>
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
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background:
                  msg.from === "shashi"
                    ? "linear-gradient(135deg, #ffe500, #ff3b30)"
                    : "linear-gradient(135deg, #c0c0c0, #808080)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                border: "1px solid #777"
              }}
            >
              {msg.from === "shashi" ? "⚡" : "👤"}
            </div>

            <div
              style={{
                maxWidth: "75%",
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
                  backgroundColor: msg.from === "shashi" ? "#e8f4fd" : "#fff9e6",
                  border: `1px solid ${msg.from === "shashi" ? "#bee3f8" : "#ffe566"}`,
                  borderRadius: msg.from === "shashi" ? "4px 12px 12px 4px" : "12px 4px 4px 12px",
                  padding: "6px 10px",
                  fontSize: "13px",
                  lineHeight: "1.45",
                  color: "#1a1a1a",
                  wordBreak: "break-word"
                }}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "#666", fontStyle: "italic" }}>
              shashikiran_bs is typing...
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
          placeholder="Type an instant message..."
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
          20% { transform: translate(-6px, 4px); }
          40% { transform: translate(6px, -4px); }
          60% { transform: translate(-4px, -3px); }
          80% { transform: translate(4px, 3px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};
