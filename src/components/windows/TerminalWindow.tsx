import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "../../data/portfolioData";

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
          <div>SHASHI-OS [Version 2000.4.1]</div>
          <div>(C) Copyright 2000-2026 Shashi Kiran. All rights reserved.</div>
          <div style={{ marginTop: "6px" }}>
            Type <span style={{ color: "#ffe500" }}>'help'</span> to see all available commands.
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

    let response: React.ReactNode;

    switch (cmd) {
      case "help":
        response = (
          <div style={{ color: "#39ff14" }}>
            <div>AVAILABLE COMMANDS:</div>
            <div>- <span style={{ color: "#ffe500" }}>about</span> : Developer summary & lore</div>
            <div>- <span style={{ color: "#ffe500" }}>skills</span> : Display full technical proficiencies</div>
            <div>- <span style={{ color: "#ffe500" }}>projects</span> : List featured software and repositories</div>
            <div>- <span style={{ color: "#ffe500" }}>contact</span> : Get direct communication lines</div>
            <div>- <span style={{ color: "#ffe500" }}>whoami</span> : Print current session credentials</div>
            <div>- <span style={{ color: "#ffe500" }}>clear</span> : Flush the terminal screen</div>
            <div>- <span style={{ color: "#ffe500" }}>matrix</span> : Trigger cybernetic stream</div>
            <div>- <span style={{ color: "#ffe500" }}>sudo</span> : Superuser privileges request</div>
          </div>
        );
        break;

      case "about":
        response = (
          <div style={{ color: "#38bdf8" }}>
            <div style={{ fontWeight: "bold" }}>{portfolioData.user.name} ({portfolioData.user.role})</div>
            <div>{portfolioData.user.tagline}</div>
            <div style={{ marginTop: "4px" }}>Base: {portfolioData.user.location} | Education: {portfolioData.user.education}</div>
          </div>
        );
        break;

      case "skills":
        response = (
          <div style={{ color: "#39ff14" }}>
            {portfolioData.skills.map((cat, i) => (
              <div key={i} style={{ marginBottom: "6px" }}>
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
                <div style={{ fontWeight: "bold", color: "#38bdf8" }}>★ {p.title} ({p.category})</div>
                <div>{p.description}</div>
                <div style={{ color: "#888", fontSize: "11px" }}>Stack: {p.tech.join(", ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        response = (
          <div style={{ color: "#f472b6" }}>
            <div>Email: {portfolioData.contact.email}</div>
            <div>Phone: {portfolioData.contact.phone}</div>
            <div>GitHub: {portfolioData.contact.github}</div>
            <div>LinkedIn: {portfolioData.contact.linkedin}</div>
            <div>Location: {portfolioData.contact.location}</div>
            <div>Resume: {portfolioData.contact.resumeUrl}</div>
          </div>
        );
        break;

      case "whoami":
        response = <div style={{ color: "#39ff14" }}>guest_user@cyber-deck.local [AUTHENTICATED]</div>;
        break;

      case "sudo":
        response = <div style={{ color: "#ef4444" }}>ACCESS DENIED: Root privileges belong to Shashi Kiran.</div>;
        break;

      case "matrix":
        response = (
          <div style={{ color: "#22c55e", fontFamily: "monospace" }}>
            <div>01010011 01001000 01000001 01010011 01001000 01001001</div>
            <div>WAKE UP, NEO... THE MATRIX HAS YOU. FOLLOW THE WHITE RABBIT 🐇</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        response = (
          <div style={{ color: "#ef4444" }}>
            Command not recognized: '{cmd}'. Type 'help' for a list of valid commands.
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
        fontSize: "14px",
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
          borderTop: "1px dashed #1e293b",
          paddingTop: "6px"
        }}
      >
        <span style={{ color: "#38bdf8" }}>C:\SHASHI&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          autoFocus
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "#39ff14",
            fontFamily: "var(--font-pixel)",
            fontSize: "14px",
            caretColor: "#39ff14"
          }}
        />
      </form>
    </div>
  );
};
