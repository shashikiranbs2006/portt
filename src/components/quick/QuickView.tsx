import { ArrowDown, ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import "./quick-view.css";

const featured = ["proj-relay-ai", "proj-edurag", "proj-fitphile"]
  .map((id) => portfolioData.projects.find((project) => project.id === id))
  .filter((project) => project !== undefined);

const projectVisuals: Record<string, { label: string; nodes: string[]; note: string }> = {
  "proj-relay-ai": { label: "Developer tooling / 01", nodes: ["REQUEST", "ROUTER", "MODEL"], note: "Automatic provider failover" },
  "proj-edurag": { label: "AI systems / 02", nodes: ["DOCUMENTS", "RETRIEVAL", "ANSWER"], note: "Context with source attribution" },
  "proj-fitphile": { label: "Full stack / 03", nodes: ["REACT", "FASTAPI", "POSTGRES"], note: "Workout and nutrition tracking" },
};

export function QuickView() {
  const { user, contact, experience, projects } = portfolioData;

  return (
    <div className="quick-view">
      <a className="quick-skip" href="#main">Skip to content</a>
      <div className="quick-shell">
        <aside className="quick-rail" aria-label="Portfolio identity">
          <a className="quick-rail-mark" href="#top" aria-label="Back to top">S<span>★</span></a>
          <span className="quick-rail-label">SHASHI / PORTFOLIO</span>
          <span className="quick-rail-year">2027</span>
        </aside>

        <div className="quick-page" id="top">
          <header className="quick-header">
            <a className="quick-wordmark" href="#top">SHASHI<span>★</span></a>
            <nav aria-label="Main navigation" className="quick-nav">
              <a href="#work">Work</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </nav>
            <a className="quick-os-link" href="/">Explore the OS <ArrowUpRight size={15} aria-hidden="true" /></a>
          </header>

          <main id="main">
            <section className="quick-hero" aria-labelledby="quick-title">
              <div className="quick-hero-copy">
                <div className="quick-kicker"><span className="quick-status-dot" /> Open to Summer 2027 SWE internships <span className="quick-kicker-index">BENGALURU · INDIA</span></div>
                <h1 id="quick-title">I build software<br />that <em>holds up.</em></h1>
                <p className="quick-hero-intro">I’m {user.name}, an AI and full-stack engineer building developer tools, agentic systems, and products people can actually use.</p>
                <p className="quick-hero-detail">Currently working on LLM orchestration at KlarDataLabs. Studying Computer Science (AI/ML) at BMSIT, Bengaluru.</p>
                <div className="quick-hero-actions">
                  <a className="quick-button quick-button-primary" href="#work">See selected work <ArrowRight size={18} aria-hidden="true" /></a>
                  <a className="quick-button quick-button-secondary" href={contact.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé <Download size={17} aria-hidden="true" /></a>
                </div>
                <a className="quick-scroll-cue" href="#work"><ArrowDown size={15} aria-hidden="true" /> Scroll to explore</a>
              </div>
              <div className="quick-hero-visual" aria-label="Portrait of Shashikiran B S">
                <div className="quick-photo-frame"><img src={user.avatarUrl} alt="Shashikiran B S" /></div>
                <div className="quick-photo-caption"><span>FIG. 01 — THE PERSON BEHIND THE CODE</span><span>ENGINEER / BUILDER / STUDENT</span></div>
                <div className="quick-photo-sticker" aria-hidden="true">S★</div>
              </div>
            </section>

            <section className="quick-work quick-section" id="work" aria-labelledby="work-title">
              <div className="quick-section-heading">
                <div><span className="quick-section-index">01 / SELECTED WORK</span><h2 id="work-title">Proof in the projects.</h2></div>
                <p>Real builds, working demos, and code you can inspect.</p>
              </div>
              <div className="quick-project-list">
                {featured.map((project, index) => {
                  const visual = projectVisuals[project.id];
                  return <article className="quick-project" key={project.id}>
                    <div className="quick-project-visual" aria-hidden="true">
                      <div className="quick-visual-top"><span>{visual.label}</span><span>↗</span></div>
                      <div className="quick-visual-flow">{visual.nodes.map((node, nodeIndex) => <span className="quick-flow-part" key={node}>{nodeIndex > 0 && <b>→</b>}<span>{node}</span></span>)}</div>
                      <span className="quick-visual-note">{visual.note}</span>
                    </div>
                    <div className="quick-project-content">
                      <div className="quick-project-overline"><span>0{index + 1} / {project.category}</span><span>FEATURED PROJECT</span></div>
                      <h3>{project.title}</h3>
                      <p className="quick-project-subtitle">{project.subtitle}</p>
                      <p className="quick-project-description">{project.description}</p>
                      <div className="quick-project-tech">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
                      <div className="quick-project-links">
                        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={17} aria-hidden="true" /></a>}
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={17} aria-hidden="true" /></a>}
                      </div>
                    </div>
                  </article>;
                })}
              </div>
              <div className="quick-more-work"><span>ALSO BUILT</span>{projects.filter((project) => !featured.includes(project)).map((project) => <a key={project.id} href={project.githubUrl} target="_blank" rel="noopener noreferrer">{project.title} <ArrowUpRight size={14} aria-hidden="true" /></a>)}</div>
            </section>

            <section className="quick-experience quick-section" id="experience" aria-labelledby="experience-title">
              <div className="quick-section-heading"><div><span className="quick-section-index">02 / EXPERIENCE</span><h2 id="experience-title">Where I’ve worked.</h2></div></div>
              <div className="quick-timeline">{experience.map((item) => <article className="quick-timeline-item" key={item.company}><div className="quick-timeline-date">{item.period}</div><div><h3>{item.role}</h3><p className="quick-timeline-company">{item.company} <span>· {item.location}</span></p><ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>)}</div>
            </section>

            <section className="quick-contact quick-section" id="contact" aria-labelledby="contact-title">
              <div><span className="quick-section-index">03 / GET IN TOUCH</span><h2 id="contact-title">Let’s build<br />something useful.</h2><p>Looking for a software engineering intern? I’d love to hear what you’re working on.</p></div>
              <div className="quick-contact-actions"><a className="quick-button quick-button-light" href={`mailto:${contact.email}`}>Email me <Mail size={19} aria-hidden="true" /></a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={18} aria-hidden="true" /></a><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={18} aria-hidden="true" /></a></div>
            </section>
          </main>

          <footer className="quick-footer"><span>© {new Date().getFullYear()} Shashikiran B S</span><span>Built with intent. Explore the <a href="/">interactive OS</a>.</span><a href="#top">Back to top ↑</a></footer>
        </div>
      </div>
    </div>
  );
}
