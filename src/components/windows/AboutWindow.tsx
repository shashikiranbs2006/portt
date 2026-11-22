import { ArrowRight, ArrowUpRight, BadgeCheck, Download, Mail } from "lucide-react";
import type { WindowId } from "../../types/os";
import { portfolioData } from "../../data/portfolioData";
import "./about-window.css";

export function AboutWindow({ onOpenWindow }: { onOpenWindow: (id: WindowId) => void }) {
  const { user, experience, skills, projects, contact } = portfolioData;
  return <div className="about-app">
    <div className="about-topbar"><span>SHASHI★ OS / PROFILE</span><span>01 — ABOUT</span></div>
    <div className="about-hero">
      <div className="about-hero-copy"><span className="about-eyebrow"><span /> AVAILABLE FOR SUMMER 2027 SWE INTERNSHIPS</span><h1>Building useful things,<br /><em>with personality.</em></h1><p>I’m Shashikiran, an AI and full-stack engineer who likes turning messy problems into clear, working products.</p><div className="about-hero-actions"><button type="button" onClick={() => onOpenWindow("projects")}>Explore projects <ArrowRight size={16} /></button><button type="button" onClick={() => onOpenWindow("resume")}>View résumé <Download size={16} /></button></div></div>
      <div className="about-portrait"><img src={user.avatarUrl} alt="Shashikiran B S" /><span>SHASHIKIRAN B S / BENGALURU</span></div>
    </div>
    <div className="about-facts"><div><span>NOW</span><strong>{experience[0].role}</strong><small>{experience[0].company}</small></div><div><span>STUDYING</span><strong>CSE (AI/ML)</strong><small>BMSIT · 8.7 CGPA</small></div><div><span>FOCUS</span><strong>Tools + AI systems</strong><small>Built to be used</small></div></div>
    <div className="about-main"><div className="about-content">
      <section className="about-section"><div className="about-section-head"><span>01 / THE STORY</span><h2>About me</h2></div><div className="about-prose">{user.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><button type="button" className="about-inline-action" onClick={() => onOpenWindow("idbadge")}><BadgeCheck size={18} /> Flip my ID card <ArrowUpRight size={15} /></button></section>
      <section className="about-section"><div className="about-section-head"><span>02 / WHAT I’VE DONE</span><h2>Experience</h2></div><div className="about-experience">{experience.map((item) => <article key={item.company}><div><span className="about-period">{item.period}</span><h3>{item.role}</h3><p>{item.company} · {item.location}</p></div><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</div></section>
      <section className="about-section"><div className="about-section-head"><span>03 / THE TOOLKIT</span><h2>What I work with</h2></div><div className="about-skills">{skills.map((group) => <div key={group.category}><h3>{group.category}</h3><p>{group.items.join(" · ")}</p></div>)}</div></section>
      <section className="about-section"><div className="about-section-head"><span>04 / SELECTED WORK</span><h2>Built and shipped</h2></div><div className="about-projects">{projects.slice(0, 3).map((project, index) => <article key={project.id}><span>0{index + 1}</span><div><h3>{project.title}</h3><p>{project.description}</p></div>{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} demo`}><ArrowUpRight size={18} /></a>}</article>)}</div><button type="button" className="about-inline-action" onClick={() => onOpenWindow("projects")}>All projects <ArrowRight size={16} /></button></section>
    </div><aside className="about-aside"><div className="about-note"><span>PERSONAL NOTE</span><p>“{portfolioData.stickyNote.quote}”</p></div><div className="about-aside-section"><span>OUTSIDE THE EDITOR</span><p>Hackathons, developer communities, practical tools, and the occasional retro interface.</p></div><div className="about-aside-section"><span>LINKS</span><a href={contact.github} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={15} /> GitHub</a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={15} /> LinkedIn</a><a href={`mailto:${contact.email}`}><Mail size={15} /> Email ↗</a></div></aside></div>
    <footer className="about-footer"><strong>Have a problem worth solving?</strong><a href={`mailto:${contact.email}`}>Let’s talk <ArrowUpRight size={18} /></a></footer>
  </div>;
}
