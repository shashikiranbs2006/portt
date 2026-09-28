import React, { useState } from "react";
import { portfolioData, type Project } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

export const ProjectsWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Agentic AI",
    "Backend & Systems",
    "Tooling"
  ];

  const filteredProjects = portfolioData.projects.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "proj-relay-ai":
        return "🤖";
      case "proj-edurag":
        return "📚";
      case "proj-prompt-compiler":
        return "⚡";
      case "proj-credit-card":
        return "💳";
      case "proj-fitphile":
        return "🏋️";
      default:
        return "📁";
    }
  };

  const getPlatformNotice = (id: string) => {
    switch (id) {
      case "proj-relay-ai":
        return {
          badge: "VS Code Extension + Web Simulation",
          desc: "Interactive web simulation deployed on Vercel. Full VS Code extension unpackaged/VSIX downloadable from GitHub.",
          accent: "#0066cc"
        };
      case "proj-edurag":
        return {
          badge: "Render Cloud Microservice",
          desc: "Containerized RAG document retrieval service deployed live on Render.",
          accent: "#531dab"
        };
      case "proj-prompt-compiler":
        return {
          badge: "Google Chrome Extension + Web Sim",
          desc: "Interactive web simulation deployed on Vercel. Unpackaged extension files installable into Chrome via GitHub.",
          accent: "#237804"
        };
      case "proj-credit-card":
        return {
          badge: "Streamlit Cloud ML App",
          desc: "Machine learning fraud detection pipeline and real-time scoring UI deployed on Streamlit Cloud.",
          accent: "#d46b08"
        };
      case "proj-fitphile":
        return {
          badge: "Render Full-Stack Platform",
          desc: "Fitness and workout tracking web application deployed live on Render.",
          accent: "#006d75"
        };
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f0f0f0",
        fontFamily: "var(--font-sans)",
        userSelect: "none"
      }}
    >
      {/* Explorer Address Bar & Search */}
      <div
        className="bevel-sunken"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 10px",
          backgroundColor: "#fff",
          fontSize: "12px",
          borderBottom: "1px solid #c0c0c0",
          flexWrap: "wrap"
        }}
      >
        <span style={{ color: "#666", fontWeight: "bold", fontSize: "11px" }}>Address</span>
        <div
          className="bevel-sunken"
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "3px 8px",
            backgroundColor: "#fff",
            fontFamily: "var(--font-pixel)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px"
          }}
        >
          <span>📁</span>
          <span style={{ color: "#000080", fontWeight: "bold" }}>C:\Portfolio\Projects\</span>
        </div>

        {/* Live Filter / Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "#444", fontWeight: 600 }}>Filter:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack or title..."
            style={{
              padding: "3px 6px",
              fontSize: "11px",
              border: "1px solid #808080",
              borderRadius: "0",
              outline: "none",
              width: "160px",
              fontFamily: "var(--font-sans)"
            }}
          />
          {searchQuery && (
            <button
              type="button"
              className="bevel-button"
              onClick={() => {
                retroAudio.playClick(0.9);
                setSearchQuery("");
              }}
              style={{ fontSize: "10px", padding: "2px 6px" }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Toolbar */}
      <div
        className="bevel-raised"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "5px 8px",
          backgroundColor: "#ececec",
          borderBottom: "1px solid #c0c0c0",
          overflowX: "auto"
        }}
      >
        <span style={{ fontSize: "11px", color: "#555", marginRight: "4px", fontWeight: "bold" }}>Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="bevel-button"
            onClick={() => {
              retroAudio.playClick(1.0);
              setSelectedCategory(cat);
            }}
            style={{
              padding: "2px 10px",
              fontSize: "11px",
              fontWeight: selectedCategory === cat ? "bold" : "normal",
              backgroundColor: selectedCategory === cat ? "#000080" : "#e0e0e0",
              color: selectedCategory === cat ? "#fff" : "#000",
              borderRadius: "0",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {cat} {cat === "All" && `(${portfolioData.projects.length})`}
          </button>
        ))}
      </div>

      {/* Projects Grid Container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "12px",
          alignContent: "start",
          backgroundColor: "#f5f5f5"
        }}
      >
        {filteredProjects.length === 0 ? (
          <div
            className="bevel-sunken"
            style={{
              gridColumn: "1 / -1",
              padding: "30px",
              textAlign: "center",
              backgroundColor: "#fff",
              color: "#555"
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔍</div>
            <div style={{ fontWeight: "bold", fontSize: "13px" }}>
              No projects found matching &ldquo;{searchQuery}&rdquo;.
            </div>
            <button
              type="button"
              className="bevel-button"
              onClick={() => {
                retroAudio.playClick(1.0);
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              style={{ marginTop: "12px", padding: "4px 14px", fontWeight: "bold" }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map((p) => {
            const notice = getPlatformNotice(p.id);
            return (
              <div
                key={p.id}
                className="bevel-raised"
                style={{
                  padding: "12px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "10px",
                  border: "1px solid #d0d0d0",
                  boxShadow: "1px 1px 0px rgba(0,0,0,0.1)"
                }}
              >
                <div>
                  {/* Top Bar: Icon + Title + Category Tag */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderBottom: "1px solid #e0e0e0",
                      paddingBottom: "8px",
                      gap: "8px"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "22px", lineHeight: 1 }}>{getProjectIcon(p.id)}</span>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-silkscreen)",
                            fontSize: "13px",
                            color: "#000080",
                            fontWeight: "bold"
                          }}
                        >
                          {p.title}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#c0392b",
                            fontWeight: 600,
                            marginTop: "2px"
                          }}
                        >
                          {p.subtitle}
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        backgroundColor: "#ffe500",
                        color: "#000",
                        fontSize: "9px",
                        padding: "2px 6px",
                        fontWeight: "bold",
                        border: "1px solid #000",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {p.category}
                    </span>
                  </div>

                  {/* Deployment Notice Badge */}
                  {notice && (
                    <div
                      style={{
                        marginTop: "8px",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: notice.accent,
                        backgroundColor: "#f7f9fc",
                        border: `1px solid ${notice.accent}30`,
                        padding: "3px 6px",
                        borderRadius: "2px"
                      }}
                    >
                      ● {notice.badge}
                    </div>
                  )}

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: "1.5",
                      color: "#333",
                      marginTop: "8px",
                      marginBottom: "6px"
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      marginTop: "6px"
                    }}
                  >
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="bevel-sunken"
                        style={{
                          fontSize: "10px",
                          padding: "2px 6px",
                          backgroundColor: "#f8f9fa",
                          color: "#000080",
                          fontWeight: 600
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    paddingTop: "10px",
                    borderTop: "1px solid #eee",
                    flexWrap: "wrap"
                  }}
                >
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bevel-button"
                      onClick={() => retroAudio.playClick(1.2)}
                      style={{
                        flex: "1 1 auto",
                        textDecoration: "none",
                        color: "#000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        backgroundColor: "#39ff14",
                        padding: "5px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px"
                      }}
                    >
                      🚀 Live App / Sim
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bevel-button"
                      onClick={() => retroAudio.playClick(1.0)}
                      style={{
                        textDecoration: "none",
                        color: "#000",
                        fontSize: "11px",
                        padding: "5px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        backgroundColor: "#e8e8e8"
                      }}
                    >
                      🐙 GitHub Repo
                    </a>
                  )}
                  <button
                    type="button"
                    className="bevel-button"
                    onClick={() => {
                      retroAudio.playClick(1.1);
                      setActiveProject(p);
                    }}
                    style={{
                      fontSize: "11px",
                      padding: "5px 10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px"
                    }}
                  >
                    📋 Overview
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Project Overview Dialog */}
      {activeProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            backdropFilter: "blur(2px)"
          }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bevel-raised"
            style={{
              width: "600px",
              maxWidth: "100%",
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#c0c0c0",
              padding: "3px",
              boxShadow: "6px 6px 0px rgba(0,0,0,0.5)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Titlebar */}
            <div className="win-titlebar">
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span>{getProjectIcon(activeProject.id)}</span>
                <span>PROJECT_SPEC: {activeProject.title}</span>
              </span>
              <button
                type="button"
                className="win-btn"
                onClick={() => {
                  retroAudio.playClick(0.9);
                  setActiveProject(null);
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div
              className="bevel-sunken"
              style={{
                backgroundColor: "#fff",
                padding: "16px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-silkscreen)",
                        color: "#000080",
                        fontSize: "16px",
                        margin: 0
                      }}
                    >
                      {activeProject.title}
                    </h2>
                    <div style={{ fontSize: "12px", color: "#c0392b", fontWeight: 700, marginTop: "2px" }}>
                      {activeProject.subtitle}
                    </div>
                  </div>
                  <span
                    style={{
                      backgroundColor: "#ffe500",
                      color: "#000",
                      fontSize: "10px",
                      padding: "2px 6px",
                      fontWeight: "bold",
                      border: "1px solid #000",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {activeProject.category}
                  </span>
                </div>
              </div>

              {/* Direct Launch Buttons */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bevel-button"
                    onClick={() => retroAudio.playClick(1.2)}
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      backgroundColor: "#39ff14",
                      fontWeight: "bold",
                      fontSize: "12px",
                      padding: "6px 14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    🚀 Open Live App ({activeProject.demoUrl.replace("https://", "").replace(/\/$/, "")})
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bevel-button"
                    onClick={() => retroAudio.playClick(1.0)}
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      backgroundColor: "#e8e8e8",
                      fontWeight: "bold",
                      fontSize: "12px",
                      padding: "6px 14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    🐙 View GitHub Repository
                  </a>
                )}
              </div>

              {/* Platform Notice */}
              {(() => {
                const notice = getPlatformNotice(activeProject.id);
                if (!notice) return null;
                return (
                  <div
                    style={{
                      backgroundColor: "#f7f9fc",
                      borderLeft: `3px solid ${notice.accent}`,
                      padding: "8px 12px",
                      fontSize: "12px",
                      lineHeight: "1.4",
                      color: "#222"
                    }}
                  >
                    <b>Platform Overview:</b> {notice.desc}
                  </div>
                );
              })()}

              {/* Full Description */}
              <div
                style={{
                  fontSize: "12px",
                  lineHeight: "1.6",
                  backgroundColor: "#fafafa",
                  padding: "10px",
                  border: "1px solid #eee",
                  color: "#333"
                }}
              >
                {activeProject.longDescription || activeProject.description}
              </div>

              {/* Engineering Stack */}
              <div>
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "#333" }}>Tech Stack:</span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        backgroundColor: "#ffe500",
                        color: "#000",
                        fontSize: "11px",
                        padding: "2px 8px",
                        fontWeight: 700,
                        border: "1px solid #000"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <button
                  type="button"
                  className="bevel-button"
                  onClick={() => {
                    retroAudio.playClick(0.9);
                    setActiveProject(null);
                  }}
                  style={{ minWidth: "90px", fontWeight: "bold", padding: "5px 12px" }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clean Status Bar */}
      <div
        className="bevel-raised"
        style={{
          padding: "4px 10px",
          fontSize: "11px",
          fontFamily: "var(--font-pixel)",
          color: "#333",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080"
        }}
      >
        <span>{filteredProjects.length} authentic project(s) ready</span>
        <span>Vercel · Render · Streamlit · GitHub</span>
      </div>
    </div>
  );
};
