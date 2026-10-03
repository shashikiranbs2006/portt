import React, { useState, useRef, useEffect, useCallback } from "react";
import { portfolioData } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

interface HistoryItem {
  command?: string;
  output: React.ReactNode;
}

const BOOT_BANNER = (
  <div style={{ color: "#39ff14", fontFamily: "monospace", lineHeight: 1.3 }}>
    <pre style={{ margin: 0, color: "#ffe500", textShadow: "0 0 6px #ffe500", fontSize: "11px" }}>
{`  ██████ ██   ██  █████  ███████ ██   ██ ██
 ██      ██   ██ ██   ██ ██      ██   ██ ██
  █████  ███████ ███████ ███████ ███████ ██
      ██ ██   ██ ██   ██      ██ ██   ██ ██
 ██████  ██   ██ ██   ██ ███████ ██   ██ ██`}
    </pre>
    <div style={{ color: "#39ff14", marginTop: "6px" }}>SHASHI-OS [Version 2026.4.0 — AMTS Release]</div>
    <div style={{ color: "#666" }}>(C) Copyright 2024–2026 Shashikiran B S. All rights reserved.</div>
    <div style={{ marginTop: "6px" }}>
      Type <span style={{ color: "#ffe500" }}>'help'</span> or{" "}
      <span style={{ color: "#ffe500" }}>'neofetch'</span> to explore. Try{" "}
      <span style={{ color: "#ffe500" }}>'sudo hire'</span> to send an interview invite.
    </div>
  </div>
);

// ─── Git commit log simulation ───────────────────────────────────────────────
const GIT_LOG_OUTPUT = (
  <div style={{ color: "#fff", fontFamily: "monospace", fontSize: "12px", lineHeight: 1.6 }}>
    <div><span style={{ color: "#f5a623" }}>commit a7f3d9c</span> <span style={{ color: "#888" }}>(HEAD → main, origin/main)</span></div>
    <div style={{ color: "#888" }}>Author: Shashikiran B S &lt;shashikiranbs2006@gmail.com&gt;</div>
    <div style={{ color: "#888" }}>Date:   Fri Sep 27 2026</div>
    <div style={{ color: "#ffe500", marginLeft: "8px" }}>feat: upgrade Clippy with agentic message bank + mood-driven SVG</div>

    <div style={{ marginTop: "6px" }}><span style={{ color: "#f5a623" }}>commit 3bc91e4</span></div>
    <div style={{ color: "#888" }}>Author: Shashikiran B S &lt;shashikiranbs2006@gmail.com&gt;</div>
    <div style={{ color: "#888" }}>Date:   Thu Sep 26 2026</div>
    <div style={{ color: "#ffe500", marginLeft: "8px" }}>feat: BSOD boot-recovery jingle + fluid typography</div>

    <div style={{ marginTop: "6px" }}><span style={{ color: "#f5a623" }}>commit 7d4a2f1</span></div>
    <div style={{ color: "#888" }}>Author: Shashikiran B S &lt;shashikiranbs2006@gmail.com&gt;</div>
    <div style={{ color: "#ffe500", marginLeft: "8px" }}>feat: integrate deployed projects: The Relay, Yoru Chatbot, Prompt Compiler, ML Fraud Scorer</div>

    <div style={{ marginTop: "6px" }}><span style={{ color: "#f5a623" }}>commit 1e9b5c8</span></div>
    <div style={{ color: "#888" }}>Date:   Tue Sep 24 2026</div>
    <div style={{ color: "#ffe500", marginLeft: "8px" }}>feat: riso-print rubber stamps in PaintWindow, PNG export</div>

    <div style={{ marginTop: "6px" }}><span style={{ color: "#f5a623" }}>commit 0f2a7d3</span></div>
    <div style={{ color: "#888" }}>Date:   Mon Sep 23 2026</div>
    <div style={{ color: "#ffe500", marginLeft: "8px" }}>init: Vite + React + TypeScript OS portfolio skeleton</div>
  </div>
);

const SSH_OUTPUT = (
  <div style={{ color: "#39ff14", fontFamily: "monospace", fontSize: "12px", lineHeight: 1.5 }}>
    <div style={{ color: "#38bdf8" }}>ssh shashikiran@bmsit-deck.local</div>
    <div>The authenticity of host 'bmsit-deck.local' can't be established.</div>
    <div>ECDSA key fingerprint is SHA256:rKl4m1n2o3p4q5r6s7t8u9v0w1x2y3z4.</div>
    <div>Are you sure you want to continue connecting? (yes/no) <span style={{ color: "#ffe500" }}>yes</span></div>
    <div style={{ marginTop: "4px", color: "#ffe500" }}>Welcome to Shashi★OS v2026.4 (GNU/Linux agentic-bedrock x86_64)</div>
    <div style={{ color: "#888" }}>Last login: Fri Sep 27 2026 08:14:23 IST from recruiter.local</div>
    <div style={{ color: "#39ff14", marginTop: "4px" }}>shashikiran@bmsit-deck:~$ <span style={{ color: "#fff" }}>uptime && whoami && cat /etc/shashi-release</span></div>
    <div>09:44:23 up 2 years, 3 months — Backend & AI/ML — BMSIT CSE (CGPA 8.7)</div>
    <div style={{ color: "#f472b6" }}>shashikiran</div>
    <div style={{ color: "#ffe500" }}>SHASHI★OS v2026.4.0-LTS "AgenTIC Edition"</div>
  </div>
);

const CURL_OUTPUT = (
  <div style={{ fontFamily: "monospace", fontSize: "11px", lineHeight: 1.5 }}>
    <div style={{ color: "#888" }}>{'>'} GET /api/hire-shashi HTTP/1.1</div>
    <div style={{ color: "#888" }}>{'>'} Host: portfolio.shashikiran.dev</div>
    <div style={{ color: "#888" }}>{'>'} Accept: application/json</div>
    <div style={{ marginTop: "4px", color: "#39ff14" }}>{'<'} HTTP/1.1 200 OK</div>
    <div style={{ color: "#39ff14" }}>{'<'} Content-Type: application/json</div>
    <div style={{ marginTop: "4px", backgroundColor: "#0d1117", padding: "6px", borderRadius: "2px" }}>
      <div style={{ color: "#f472b6" }}>{"{"}</div>
      <div style={{ paddingLeft: "12px" }}>
        <div><span style={{ color: "#38bdf8" }}>"name"</span>: <span style={{ color: "#ffe500" }}>"Shashikiran B S"</span>,</div>
        <div><span style={{ color: "#38bdf8" }}>"role"</span>: <span style={{ color: "#ffe500" }}>"AI & Full-Stack Engineer"</span>,</div>
        <div><span style={{ color: "#38bdf8" }}>"status"</span>: <span style={{ color: "#39ff14" }}>"AVAILABLE FOR SUMMER 2027"</span>,</div>
        <div><span style={{ color: "#38bdf8" }}>"cgpa"</span>: <span style={{ color: "#ffe500" }}>8.7</span>,</div>
        <div><span style={{ color: "#38bdf8" }}>"stack"</span>: [<span style={{ color: "#ffe500" }}>"TypeScript"</span>, <span style={{ color: "#ffe500" }}>"Python"</span>, <span style={{ color: "#ffe500" }}>"React"</span>, <span style={{ color: "#ffe500" }}>"AWS Bedrock"</span>, <span style={{ color: "#ffe500" }}>"FastAPI"</span>],</div>
        <div><span style={{ color: "#38bdf8" }}>"contact"</span>: <span style={{ color: "#ffe500" }}>"shashibs238@gmail.com"</span>,</div>
        <div><span style={{ color: "#38bdf8" }}>"hire_probability"</span>: <span style={{ color: "#39ff14" }}>"99.7%"</span></div>
      </div>
      <div style={{ color: "#f472b6" }}>{"}"}</div>
    </div>
  </div>
);

const PING_OUTPUT = (
  <div style={{ color: "#39ff14", fontFamily: "monospace", fontSize: "12px", lineHeight: 1.6 }}>
    <div style={{ color: "#38bdf8" }}>PING recruiter.local (192.168.1.42): 56 data bytes</div>
    <div>64 bytes from 192.168.1.42: icmp_seq=0 ttl=64 time=<span style={{ color: "#ffe500" }}>0.431 ms</span></div>
    <div>64 bytes from 192.168.1.42: icmp_seq=1 ttl=64 time=<span style={{ color: "#ffe500" }}>0.388 ms</span></div>
    <div>64 bytes from 192.168.1.42: icmp_seq=2 ttl=64 time=<span style={{ color: "#ffe500" }}>0.412 ms</span></div>
    <div>64 bytes from 192.168.1.42: icmp_seq=3 ttl=64 time=<span style={{ color: "#ffe500" }}>0.399 ms</span></div>
    <div style={{ marginTop: "4px", color: "#888" }}>--- recruiter.local ping statistics ---</div>
    <div>4 packets transmitted, 4 received, <span style={{ color: "#39ff14" }}>0.0% packet loss</span></div>
    <div>round-trip min/avg/max = 0.388/<span style={{ color: "#ffe500" }}>0.407</span>/0.431 ms</div>
    <div style={{ marginTop: "4px", color: "#f472b6" }}>✓ Connection to recruiter established. Hire signal strong.</div>
  </div>
);

const UPTIME_OUTPUT = (
  <div style={{ color: "#39ff14", fontFamily: "monospace", fontSize: "12px" }}>
    <div>09:44:23 up 2 years,  3 months,  14 days,  7:22</div>
    <div>load average: 8.70 (CGPA), 0.93 (Coffee Cups Today), 99.7 (Hire Index)</div>
    <div style={{ marginTop: "4px", color: "#888" }}>Processes: 5 live projects running, 0 zombie.</div>
  </div>
);

const LS_OUTPUT = (
  <div style={{ fontFamily: "monospace", fontSize: "12px", lineHeight: 1.5 }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px 16px" }}>
      {["projects/", "skills/", "experience/", "education/", "contact/", "resume.pdf", "portfolio.tsx", "README.md", ".secrets/", "AMTS_2027.txt", "easter_egg.sh", "riso_stamps/"].map((item, idx) => (
        <span key={`${item}-${idx}`} style={{ color: item.endsWith("/") ? "#38bdf8" : item.endsWith(".sh") ? "#39ff14" : item.startsWith(".") ? "#888" : "#fff" }}>
          {item}
        </span>
      ))}
    </div>
  </div>
);

export const TerminalWindow: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([{ output: BOOT_BANNER }]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    retroAudio.playDriveRead();
    setCmdHistory((prev) => [cmd, ...prev].slice(0, 50));
    setHistoryIdx(-1);

    let response: React.ReactNode;

    switch (cmd) {
      case "help":
        response = (
          <div style={{ color: "#39ff14" }}>
            <div style={{ color: "#ffe500", fontWeight: "bold", marginBottom: "4px" }}>SYSTEM COMMAND REGISTRY:</div>
            {[
              ["neofetch", "Render terminal system specs & ASCII badge"],
              ["about", "Engineer biography & academic history"],
              ["skills", "Display technical proficiencies breakdown"],
              ["projects", "List authentic backend & AI repositories"],
              ["cat resume", "Read plain text resume transcript"],
              ["sudo hire", "Launch superuser recruiter pipeline"],
              ["contact", "Direct email, phone & social handles"],
              ["git log", "Commit history of this portfolio"],
              ["ls", "List filesystem contents"],
              ["ping", "Ping recruiter server"],
              ["curl /api/hire-shashi", "Fetch hire endpoint JSON"],
              ["ssh shashikiran@bmsit-deck", "Open SSH session"],
              ["uptime", "System uptime & load average"],
              ["whoami", "Current authenticated user"],
              ["matrix", "Trigger binary rain stream"],
              ["banner", "Print ASCII name banner"],
              ["clear", "Flush terminal screen"],
            ].map(([cmd, desc]) => (
              <div key={cmd}>
                — <span style={{ color: "#ffe500" }}>{cmd}</span> : {desc}
              </div>
            ))}
          </div>
        );
        break;

      case "neofetch":
        response = (
          <div style={{ display: "flex", gap: "16px", color: "#39ff14", fontFamily: "monospace", fontSize: "12px", lineHeight: "1.35", flexWrap: "wrap" }}>
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
              <div><b style={{ color: "#ffe500" }}>OS:</b> SHASHI★ OS v2026.4 (x86_64)</div>
              <div><b style={{ color: "#ffe500" }}>Host:</b> BMS Institute of Tech (AI/ML)</div>
              <div><b style={{ color: "#ffe500" }}>Kernel:</b> 6.8.0-agentic-bedrock</div>
              <div><b style={{ color: "#ffe500" }}>Uptime:</b> 8.7 CGPA / 10.0</div>
              <div><b style={{ color: "#ffe500" }}>Internship:</b> KlarDataLabs (Zurich, Remote)</div>
              <div><b style={{ color: "#ffe500" }}>Stack:</b> TypeScript, Python, React, Bedrock, FastAPI</div>
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
            <div>• AI & Full-Stack Engineer | CSE (AI/ML) @ BMSIT (CGPA 8.7/10)</div>
            <div>• KlarDataLabs Intern: Agent orchestration with Strands Agents SDK & AWS Bedrock</div>
            <div>• NIRMAAN 2026 Lead Organiser: ₹1,00,000 prize pool, 200+ participants, 52 sponsors</div>
            <div>• Shipped Projects: The Relay (VS Code Ext), Yoru Chatbot / EduRAG, Prompt Compiler, Credit Card Fraud Detection, FitPhile</div>
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

      case "git log":
      case "git log --oneline":
      case "git log -n 5":
        response = GIT_LOG_OUTPUT;
        break;

      case "ls":
      case "ls -la":
      case "dir":
        response = LS_OUTPUT;
        break;

      case "ping":
      case "ping recruiter":
      case "ping recruiter.local":
        response = PING_OUTPUT;
        break;

      case "curl /api/hire-shashi":
      case "curl hire":
      case "curl shashi":
        response = CURL_OUTPUT;
        break;

      case "ssh shashikiran@bmsit-deck":
      case "ssh shashikiran":
        response = SSH_OUTPUT;
        break;

      case "uptime":
        response = UPTIME_OUTPUT;
        break;

      case "banner":
        response = (
          <pre style={{ color: "#ffe500", textShadow: "0 0 8px #ffe500", fontFamily: "monospace", fontSize: "11px", margin: 0 }}>
{`  ██████ ██   ██  █████  ███████ ██   ██ ██
 ██      ██   ██ ██   ██ ██      ██   ██ ██
  █████  ███████ ███████ ███████ ███████ ██
      ██ ██   ██ ██   ██      ██ ██   ██ ██
 ██████  ██   ██ ██   ██ ███████ ██   ██ ██

       BACKEND & AGENTIC AI ENGINEER`}
          </pre>
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
            <div>SYSTEM ARCHITECTURE: AUTHENTIC DISTRIBUTED DEPLOYMENTS ACTIVE.</div>
            <div style={{ color: "#888", fontSize: "11px" }}>// Vercel · Render · Streamlit Cloud · AWS Bedrock</div>
          </div>
        );
        break;

      case "cat easter_egg.sh":
      case "sh easter_egg.sh":
      case "./easter_egg.sh":
        retroAudio.playBootJingle();
        response = (
          <div style={{ color: "#f472b6", fontFamily: "monospace" }}>
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>🎸 EASTER EGG UNLOCKED: BACKSTAGE ACCESS</div>
            <div style={{ marginTop: "4px" }}>Secret code: <b style={{ color: "#ffe500" }}>AMTS-2027</b></div>
            <div style={{ color: "#888" }}>Enter this in Minesweeper after you win for the VIP Backstage Pass.</div>
            <div style={{ color: "#39ff14", marginTop: "4px" }}>Good luck. It's Minesweeper. You'll need it.</div>
          </div>
        );
        break;

      case "cat amts_2027.txt":
      case "cat amts":
        response = (
          <div style={{ color: "#38bdf8", fontFamily: "monospace" }}>
            <div style={{ color: "#ffe500", fontWeight: "bold" }}>AMTS_2027.txt — CLASSIFIED</div>
            <div>Target: Amazon, Microsoft, or top-tier SWE Intern position</div>
            <div>Timeline: Applications Q4 2026 → On-site Q1 2027 → Start May 2027</div>
            <div>Status: <span style={{ color: "#39ff14" }}>OPEN TO OPPORTUNITIES</span></div>
            <div style={{ marginTop: "4px", color: "#888" }}>Interested? Run 'sudo hire' now.</div>
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

    setHistory((prev) => [...prev, { command: inputVal.trim(), output: response }]);
    setInputVal("");
  }, [inputVal]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      if (cmdHistory[newIdx]) setInputVal(cmdHistory[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInputVal(newIdx === -1 ? "" : cmdHistory[newIdx]);
    }
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
        flexDirection: "column",
      }}
      className="bevel-sunken"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Scan-line overlay effect */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        zIndex: 1,
      }} />

      {/* Output History */}
      <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
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
          paddingTop: "6px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#38bdf8", flexShrink: 0 }}>C:\SHASHI&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => { setInputVal(e.target.value); setHistoryIdx(-1); }}
          onKeyDown={handleKeyDown}
          placeholder="type a command (try 'neofetch', 'git log', 'sudo hire')..."
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontFamily: "var(--font-pixel)",
            fontSize: "13px",
          }}
          autoFocus
        />
      </form>
    </div>
  );
};
