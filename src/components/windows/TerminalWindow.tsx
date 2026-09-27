import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

interface HistoryItem {
  command?: string;
  output: React.ReactNode;
}

export const TerminalWindow: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      output: (
        <div style={{ color: "#39ff14" }}>
          <div>SHASHI-OS [Version 2026.3.0 - AMTS Release]</div>
          <div>(C) Copyright 2024-2026 Shashikiran B S. All rights reserved.</div>
          <div style={{ marginTop: "6px" }}>
            Type <span style={{ color: "#ffe500" }}>'help'</span> or <span style={{ color: "#ffe500" }}>'neofetch'</span> to explore.
          </div>
        </div>
      )
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    retroAudio.playDriveRead();
    let response: React.ReactNode;

    switch (cmd) {
      case "help":
        response = (
          <div style={{ color: "#39ff14" }}>
            <div style={{ color: "#ffe500", fontWeight: "bold" }}>SYSTEM COMMAND REGISTRY:</div>
            <div>- <span style={{ color: "#ffe500" }}>neofetch</span> : Render terminal system specs & ASCII badge</div>
            <div>- <span style={{ color: "#ffe500" }}>about</span> : Engineer biography & academic history</div>
            <div>- <span style={{ color: "#ffe500" }}>skills</span> : Display technical proficiencies breakdown</div>
            <div>- <span style={{ color: "#ffe500" }}>projects</span> : List authentic backend & AI repositories</div>
            <div>- <span style={{ color: "#ffe500" }}>cat resume</span> : Read plain text resume transcript</div>
            <div>- <span style={{ color: "#ffe500" }}>sudo hire</span> : Launch superuser recruiter pipeline</div>
            <div>- <span style={{ color: "#ffe500" }}>contact</span> : Direct email, phone & social handles</div>
            <div>- <span style={{ color: "#ffe500" }}>matrix</span> : Trigger binary rain stream</div>
            <div>- <span style={{ color: "#ffe500" }}>clear</span> : Flush terminal screen</div>
          </div>
        );
        break;

      case "neofetch":
        response = (
          <div style={{ display: "flex", gap: "16px", color: "#39ff14", fontFamily: "monospace", fontSize: "12px", lineHeight: "1.3" }}>
            <pre style={{ margin: 0, color: "#ffe500", textShadow: "0 0 6px #ffe500" }}>
{`   _____ __  _____   _____ __  ____
  / ___// / / /   | / ___// / / / /
  \\__ \\/ /_/ / /| | \\__ \\/ /_/ / / 
 ___/ / __  / ___ |___/ / __  /_/  
/____/_/ /_/_/  |_/____/_/ /_(_)   `}
            </pre>
            <div>
              <div style={{ color: "#ff3b30", fontWeight: "bold" }}>shashikiran@bmsit-deck</div>
              <div>-------------------------</div>
              <div><b style={{ color: "#ffe500" }}>OS:</b> SHASHI★ OS v3.0 (x86_64)</div>
              <div><b style={{ color: "#ffe500" }}>Host:</b> BMS Institute of Tech (AI/ML)</div>
              <div><b style={{ color: "#ffe500" }}>Kernel:</b> 6.8.0-agentic-bedrock</div>
              <div><b style={{ color: "#ffe500" }}>Uptime:</b> 8.7 CGPA / 10.0</div>
              <div><b style={{ color: "#ffe500" }}>Internship:</b> KlarDataLabs (Zurich, Remote)</div>
              <div><b style={{ color: "#ffe500" }}>Packages:</b> FastAPI, PostgreSQL, Docker, Testcontainers</div>
              <div><b style={{ color: "#ffe500" }}>Target:</b> Summer 2027 SWE Intern (AMTS)</div>
              <div style={{ marginTop: "4px", display: "flex", gap: "4px" }}>
                {["#ff3b30", "#ffe500", "#39ff14", "#00d2ff", "#bf5af2"].map((c, i) => (
                  <span key={i} style={{ backgroundColor: c, width: "14px", height: "10px", display: "inline-block" }} />
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case "about":
        response = (
          <div style={{ color: "#38bdf8" }}>
            <div style={{ fontWeight: "bold", color: "#ffe500" }}>{portfolioData.user.name} ({portfolioData.user.role})</div>
            <div>{portfolioData.user.tagline}</div>
            <div style={{ marginTop: "4px" }}>Education: {portfolioData.user.education}</div>
            <div>CGPA: {portfolioData.user.cgpa}</div>
            <div style={{ marginTop: "4px", color: "#ccc" }}>{portfolioData.user.bio.join(" ")}</div>
          </div>
        );
        break;

      case "skills":
        response = (
          <div style={{ color: "#39ff14" }}>
            {portfolioData.skills.map((cat, i) => (
              <div key={i} style={{ marginBottom: "4px" }}>
                <span style={{ color: "#ffe500", fontWeight: "bold" }}>[{cat.category}]</span>:{" "}
                <span>{cat.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        response = (
          <div style={{ color: "#a78bfa" }}>
            {portfolioData.projects.map((p, i) => (
              <div key={i} style={{ marginBottom: "6px" }}>
                <div style={{ fontWeight: "bold", color: "#ffe500" }}>★ {p.title} [{p.category}]</div>
                <div style={{ color: "#fff" }}>{p.description}</div>
                <div style={{ color: "#38bdf8", fontSize: "11px" }}>Stack: {p.tech.join(", ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "cat resume":
      case "cat resume.txt":
      case "resume":
        response = (
          <div style={{ color: "#fff", backgroundColor: "#0a0a14", padding: "8px", border: "1px solid #333" }}>
            <div style={{ color: "#ffe500", fontWeight: "bold" }}>RESUME SUMMARY (Shashikiran B S):</div>
            <div>• Backend & Agentic AI Engineer | CSE (AI/ML) @ BMSIT (CGPA 8.7/10)</div>
            <div>• KlarDataLabs Intern: Agent orchestration with Strands Agents SDK & AWS Bedrock</div>
            <div>• NIRMAAN 2026 Lead Organiser: ₹1,00,000 prize pool, 200+ participants, 52 sponsors</div>
            <div>• Projects: Multi-Tenant Ticketing Platform, Relay AI Assistant, EduRAG</div>
            <div style={{ marginTop: "6px" }}>
              <a
                href={portfolioData.contact.resumeUrl}
                download
                style={{ color: "#39ff14", textDecoration: "underline" }}
              >
                [Click here to download verified PDF resume]
              </a>
            </div>
          </div>
        );
        break;

      case "sudo hire":
      case "sudo hire shashi":
      case "hire":
        response = (
          <div style={{ color: "#39ff14", backgroundColor: "rgba(57,255,20,0.1)", padding: "8px", border: "1px solid #39ff14" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ffe500" }}>
              🎉 SUPERUSER PERMISSION GRANTED: HIRING SHASHIKIRAN B S!
            </div>
            <div style={{ marginTop: "4px" }}>
              Opening your default mail client to dispatch an interview invitation to <b>{portfolioData.contact.email}</b>...
            </div>
          </div>
        );
        setTimeout(() => {
          window.open(`mailto:${portfolioData.contact.email}?subject=${encodeURIComponent("Interview Invitation: SWE Intern 2027")}&body=${encodeURIComponent("Hi Shashikiran,\n\nWe loved your portfolio and would love to schedule an interview!")}`);
        }, 800);
        break;

      case "contact":
        response = (
          <div style={{ color: "#f472b6" }}>
            <div>✉ Email: <a href={`mailto:${portfolioData.contact.email}`} style={{ color: "#ffe500" }}>{portfolioData.contact.email}</a></div>
            <div>📞 Phone: <a href={`tel:${portfolioData.contact.phone}`} style={{ color: "#ffe500" }}>{portfolioData.contact.phone}</a></div>
            <div>🐙 GitHub: <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" style={{ color: "#ffe500" }}>{portfolioData.contact.github}</a></div>
            <div>💼 LinkedIn: <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" style={{ color: "#ffe500" }}>{portfolioData.contact.linkedin}</a></div>
            <div>📍 Location: {portfolioData.contact.location}</div>
          </div>
        );
        break;

      case "whoami":
        response = <div style={{ color: "#39ff14" }}>guest_recruiter@cyber-deck.local [AUTHENTICATED]</div>;
        break;

      case "sudo":
        response = <div style={{ color: "#ef4444" }}>ACCESS RESTRICTED: Try typing 'sudo hire' instead!</div>;
        break;

      case "matrix":
        response = (
          <div style={{ color: "#22c55e", fontFamily: "monospace" }}>
            <div>01010011 01001000 01000001 01010011 01001000 01001001</div>
            <div>SYSTEM ARCHITECTURE: ZERO-TRUST MULTI-TENANT ISOLATION ACTIVATED.</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        retroAudio.playClick(0.7);
        response = (
          <div style={{ color: "#ef4444" }}>
            Command not recognized: '{cmd}'. Type <span style={{ color: "#ffe500" }}>'help'</span> for valid commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal("");
  };

  return (
    <div
      style={{
        backgroundColor: "#05080c",
        height: "100%",
        padding: "10px",
        overflowY: "auto",
        fontFamily: "var(--font-pixel)",
        fontSize: "13px",
        lineHeight: 1.4,
        color: "#39ff14",
        display: "flex",
        flexDirection: "column"
      }}
      className="bevel-sunken"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output History */}
      <div style={{ flex: 1 }}>
        {history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "8px" }}>
            {item.command && (
              <div style={{ display: "flex", gap: "6px", color: "#38bdf8" }}>
                <span>C:\SHASHI&gt;</span>
                <span style={{ color: "#ffffff" }}>{item.command}</span>
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Active Command Input Line */}
      <form
        onSubmit={handleCommand}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "6px",
          borderTop: "1px solid #1a2233",
          paddingTop: "6px"
        }}
      >
        <span style={{ color: "#38bdf8", flexShrink: 0 }}>C:\SHASHI&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type a command (try 'neofetch' or 'sudo hire')..."
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontFamily: "var(--font-pixel)",
            fontSize: "13px"
          }}
          autoFocus
        />
      </form>
    </div>
  );
};
