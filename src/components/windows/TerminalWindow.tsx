import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import type { WindowId } from "../../types/os";
import { COMMANDS, runTerminal } from "./terminalEngine";
import type { TerminalResult } from "./terminalEngine";
import "./terminal-window.css";

type HistoryItem = { command: string; cwd: string; result: TerminalResult };
const suggestions = ["help", "ls", "cat about.txt", "ls projects", "open resume", "git log"];

export function TerminalWindow({ onOpenWindow }: { onOpenWindow: (id: WindowId) => void }) {
  const [cwd, setCwd] = useState("/");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => { outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" }); }, [history]);

  const execute = (value: string) => {
    const command = value.trim();
    if (!command) return;
    const result = runTerminal(command, cwd, [...commandHistory, command]);
    if (result.clear) setHistory([]);
    else setHistory((items) => [...items, { command, cwd, result }]);
    if (result.cwd) setCwd(result.cwd);
    if (result.openWindow) onOpenWindow(result.openWindow);
    setCommandHistory((items) => [...items, command].slice(-100));
    setHistoryIndex(-1);
    setInput("");
  };

  const submit = (event: FormEvent) => { event.preventDefault(); execute(input); };
  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = event.key === "ArrowUp" ? Math.min(historyIndex + 1, commandHistory.length - 1) : Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next < 0 ? "" : commandHistory[commandHistory.length - 1 - next]);
    } else if (event.key === "Tab") {
      const match = COMMANDS.find((command) => command.startsWith(input.toLowerCase()) && command !== input.toLowerCase());
      if (match) { event.preventDefault(); setInput(match + " "); }
    }
  };

  return <div className="terminal-app" onClick={(event) => { if (!(event.target instanceof HTMLElement) || !event.target.closest("a,button")) inputRef.current?.focus(); }}>
    <header className="terminal-header"><div><span className="terminal-led" /> PORTFOLIO SHELL</div><span>READ ONLY · LOCAL SESSION</span></header>
    <div className="terminal-output" ref={outputRef} role="log" aria-live="polite">
      <div className="terminal-banner"><strong>SHASHI★ OS</strong><p>Explore the work behind the desktop. Type <b>help</b> to begin.</p></div>
      {history.map((item, index) => <div className="terminal-entry" key={`${index}-${item.command}`}><div className="terminal-command"><span>visitor@shashi:{item.cwd}$</span> {item.command}</div>{item.result.lines.length > 0 && <pre>{item.result.lines.join("\n")}</pre>}{item.result.link && <a href={item.result.link.url} target="_blank" rel="noopener noreferrer">{item.result.link.label}</a>}</div>)}
    </div>
    <div className="terminal-suggestions" aria-label="Try a command">{suggestions.map((command) => <button type="button" key={command} onClick={() => execute(command)}>{command}</button>)}</div>
    <form className="terminal-prompt" onSubmit={submit}><label htmlFor="terminal-input">visitor@shashi:{cwd}$</label><input id="terminal-input" ref={inputRef} value={input} onChange={(event) => { setInput(event.target.value); setHistoryIndex(-1); }} onKeyDown={keyDown} autoComplete="off" spellCheck={false} aria-label="Terminal command" placeholder="type a command…" /><button type="submit">↵</button></form>
  </div>;
}
