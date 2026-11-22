import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import type { WindowId } from "../../types/os";
import { portfolioData } from "../../data/portfolioData";
import "./welcome-panel.css";

interface WelcomePanelProps {
  onOpenWindow: (id: WindowId) => void;
  onOpenClippy: () => void;
}

export function WelcomePanel({ onOpenWindow, onOpenClippy }: WelcomePanelProps) {
  return <section className="welcome-panel" aria-labelledby="welcome-title">
    <div className="welcome-titlebar"><span><span className="welcome-titlebar-square" /> WELCOME.TXT</span><span>SHASHI★ OS</span></div>
    <div className="welcome-body">
      <div className="welcome-eyebrow"><span className="welcome-live-dot" /> AVAILABLE FOR SUMMER 2027 SWE INTERNSHIPS</div>
      <h1 id="welcome-title">Hi, I’m <span>Shashi.</span></h1>
      <p className="welcome-lede">I build developer tools, AI systems, and full-stack products that solve real problems.</p>
      <p className="welcome-context">Agentic AI intern at KlarDataLabs · CSE (AI/ML) at BMSIT, Bengaluru</p>
      <div className="welcome-actions">
        <button type="button" className="welcome-primary" onClick={() => onOpenWindow("projects")}>View projects <ArrowRight size={17} aria-hidden="true" /></button>
        <a href={portfolioData.contact.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <Download size={16} aria-hidden="true" /></a>
        <a href={`mailto:${portfolioData.contact.email}`}>Contact <Mail size={16} aria-hidden="true" /></a>
      </div>
      <div className="welcome-footer"><button type="button" onClick={() => onOpenWindow("about")}>More about me <ArrowUpRight size={14} aria-hidden="true" /></button><button type="button" onClick={onOpenClippy}>Meet Clippy ↗</button></div>
    </div>
  </section>;
}
