import { Download, ExternalLink, FileText } from "lucide-react";
import { portfolioData } from "../../data/portfolioData";
import "./resume-window.css";

export function ResumeWindow() {
  const url = portfolioData.contact.resumeUrl;
  return <div className="resume-app">
    <div className="resume-toolbar">
      <div className="resume-identity"><span className="resume-file-icon"><FileText size={20} /></span><div><strong>Résumé</strong><small>Shashikiran B S · PDF · 1 page</small></div></div>
      <div className="resume-actions"><a href={url} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Open PDF</a><a href={url} download="Shashikiran_BS_Resume.pdf" className="resume-download"><Download size={15} /> Download</a></div>
    </div>
    <div className="resume-preview"><object data={`${url}#toolbar=0`} type="application/pdf" aria-label="Preview of Shashikiran B S résumé"><div className="resume-fallback"><FileText size={48} /><strong>Preview unavailable in this browser</strong><p>The PDF is ready to open or download.</p><a href={url} target="_blank" rel="noopener noreferrer">Open résumé PDF ↗</a></div></object></div>
    <div className="resume-status"><span>SHASHI★ OS / DOCUMENT VIEWER</span><span>01 / 01</span></div>
  </div>;
}
