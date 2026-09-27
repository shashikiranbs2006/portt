import React, { useState, useRef, useEffect } from "react";

interface Message {
  from: "visitor" | "shashi";
  text: string;
  time: string;
}

const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const SHASHI_RESPONSES: Record<string, string[]> = {
  "hi|hello|hey|yo|sup": [
    "hey!! wassup, glad u found the messenger lol. i'm shashi btw 👋",
    "heyyy!! omg u actually found this hidden feature lmaooo. what's up?",
    "HEYYY welcome to my lil corner of the internet 🌐"
  ],
  "who are you|who r u|introduce yourself": [
    "lmaooo ok ok — i'm shashi, 3rd year CSE (AI/ML) @ BMSIT. currently interning @KlarDataLabs building agentic stuff w/ AWS Bedrock 🔥",
    "i'm shashi! backend dev + agentic AI enjoyer. building multi-tenant systems by day, retro OS portfolios by night 😅"
  ],
  "hire|job|internship|opportunity": [
    "OOH YES PLEASE!! my email is shashibs238@gmail.com — please hit me up 🙏🙏🙏",
    "wait actually?? that would be SO COOL — shashibs238@gmail.com is the move. or check the Motorola Razr app lol"
  ],
  "project|work|built|portfolio": [
    "so i've been building some banger stuff at klardata — agentic orchestration, LLM tooling, that kinda thing. also organising hackathons. full project list coming soon tho 👀",
    "currently the real project list is secret menu only lmao, but trust it slaps. check the Projects window for the vibe"
  ],
  "cool|nice|wow|amazing|fire|sick|goat": [
    "RIGHT?? i spent way too long on this lmaooo but i regret nothing 😤",
    "thank u thank u 🙏 it took forever but the boot sequence alone was worth it"
  ],
  "clippy|windows|xp|retro": [
    "LMAOOO clippy is my spirit animal honestly. old school software had such personality u know?",
    "windows xp was literally peak aesthetic. that bliss wallpaper... undefeated honestly"
  ],
  "minesweeper|game": [
    "yo u found minesweeper!! it's in the start menu 👀 i literally coded the whole thing from scratch for this",
    "real ones click the start menu and find minesweeper 💪 first click never hits a mine btw"
  ],
  "bsod|blue screen": [
    "LMAOOO did u click the recycle bin?? classic trap 😭",
    "the blue screen is my fav easter egg ngl. 'RECRUITER_NOT_IMPRESSED_EXCEPTION' is killing me"
  ],
  "default": [
    "haha ok ok i feel u. tbh i'm just a simple AI shashi replica, real me is way more chaotic 😂 — shashibs238@gmail.com to find out",
    "lol idk how to respond to that ngl 😭 but u seem cool!! check out the projects section?",
    "vibes. that's it. that's my response 🫡",
    "ok that's actually kinda interesting — but lowkey just email me at shashibs238@gmail.com and let's chat properly??",
    "LMAOOO literally. ok but actually — my github is github.com/shashikiranbs2006, go see the real chaos"
  ]
};

function getShashiReply(input: string): string {
  const lower = input.toLowerCase();
  for (const [pattern, replies] of Object.entries(SHASHI_RESPONSES)) {
    if (pattern === "default") continue;
    if (pattern.split("|").some(k => lower.includes(k))) {
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
  const defaults = SHASHI_RESPONSES.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
}

export const MessengerWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "shashi",
      text: "heyyy!! you found the secret messenger app lmaooo 👋 ask me anything — about my projects, my internship, literally anything",
      time: getTime()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const visitorMsg: Message = { from: "visitor", text: trimmed, time: getTime() };
    setMessages(prev => [...prev, visitorMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getShashiReply(trimmed);
      setIsTyping(false);
      setMessages(prev => [...prev, { from: "shashi", text: reply, time: getTime() }]);
    }, 800 + Math.random() * 1000);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      backgroundColor: "#c0c0c0",
      fontFamily: "var(--font-body)"
    }}>
      {/* MSN Header */}
      <div style={{
        background: "linear-gradient(90deg, #1a2d91 0%, #0080c0 100%)",
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        {/* Shashi "avatar" */}
        <div style={{
          width: "36px", height: "36px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ffe500, #ff3b30)",
          border: "2px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px"
        }}>⚡</div>
        <div>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "13px" }}>Shashikiran B S</div>
          <div style={{ color: "#cde", fontSize: "11px" }}>
            🟢 Online — Backend dev @ KlarDataLabs
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/MSN_Messenger_7.5.svg/120px-MSN_Messenger_7.5.svg.png"
            alt="MSN"
            style={{ height: "24px", opacity: 0.8 }}
            onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
          />
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        backgroundColor: "#fffff0",
        padding: "3px 8px",
        fontSize: "11px",
        borderBottom: "1px solid #c0c0c0",
        fontStyle: "italic",
        color: "#555"
      }}>
        💡 This is an AI Shashi — not the real one! (But real one has the same energy tbh)
      </div>

      {/* Messages Area */}
      <div className="bevel-sunken" style={{
        flex: 1,
        overflowY: "auto",
        padding: "8px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: "flex",
            flexDirection: msg.from === "visitor" ? "row-reverse" : "row",
            alignItems: "flex-end",
            gap: "8px"
          }}>
            {/* Avatar */}
            <div style={{
              width: "28px", height: "28px",
              borderRadius: "50%",
              background: msg.from === "shashi"
                ? "linear-gradient(135deg, #ffe500, #ff3b30)"
                : "linear-gradient(135deg, #c0c0c0, #808080)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              border: "1px solid #999"
            }}>
              {msg.from === "shashi" ? "⚡" : "🙂"}
            </div>

            {/* Bubble */}
            <div style={{
              maxWidth: "70%",
              display: "flex",
              flexDirection: "column",
              alignItems: msg.from === "visitor" ? "flex-end" : "flex-start"
            }}>
              <div style={{
                fontSize: "10px",
                color: "#888",
                marginBottom: "2px",
                fontFamily: "var(--font-pixel)"
              }}>
                {msg.from === "shashi" ? "shashikiran_bs" : "you"} · {msg.time}
              </div>
              <div style={{
                backgroundColor: msg.from === "shashi" ? "#e8f4fd" : "#fff9e6",
                border: `1px solid ${msg.from === "shashi" ? "#bee3f8" : "#ffe566"}`,
                borderRadius: msg.from === "shashi" ? "4px 12px 12px 4px" : "12px 4px 4px 12px",
                padding: "7px 10px",
                fontSize: "13px",
                lineHeight: "1.4",
                color: "#1a1a1a"
              }}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ffe500, #ff3b30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px"
            }}>⚡</div>
            <div style={{
              backgroundColor: "#e8f4fd",
              border: "1px solid #bee3f8",
              borderRadius: "4px 12px 12px 4px",
              padding: "8px 14px",
              display: "flex",
              gap: "4px",
              alignItems: "center"
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#999",
                  animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: "6px",
        borderTop: "1px solid #808080",
        display: "flex",
        gap: "6px"
      }}>
        <div className="bevel-sunken" style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: "2px 4px"
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "13px",
              fontFamily: "var(--font-body)"
            }}
          />
        </div>
        <button
          type="button"
          className="bevel-button"
          onClick={handleSend}
          style={{ fontSize: "11px", padding: "4px 10px", fontWeight: "bold" }}
        >
          Send
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};
