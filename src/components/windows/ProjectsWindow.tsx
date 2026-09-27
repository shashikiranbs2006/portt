import React, { useState } from "react";
import { portfolioData, type Project } from "../../data/portfolioData";

export const ProjectsWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { projects } = portfolioData;

  const categories = ["All", "Creative Tech", "AI & ML", "Web App", "System"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#ffffff",
        fontFamily: "var(--font-body)"
      }}
      className="bevel-sunken"
    >
      {/* File Explorer Address Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 8px",
          backgroundColor: "#c0c0c0",
          borderBottom: "1px solid #808080",
          fontSize: "12px",
          fontFamily: "var(--font-pixel)"
        }}
      >
        <span style={{ color: "#444" }}>Address:</span>
        <div
          className="bevel-sunken"
          style={{
            flex: 1,
            backgroundColor: "#fff",
            padding: "2px 6px",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
        >
          <span>📁</span>
          <span>C:\PORTFOLIO\PROJECTS_ARCHIVE\</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "6px 8px",
          backgroundColor: "#dfdfdf",
          borderBottom: "1px solid #c0c0c0",
          overflowX: "auto"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`bevel-button ${selectedCategory === cat ? "active font-bold" : ""}`}
            style={{ fontSize: "11px", padding: "2px 8px" }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px"
        }}
      >
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bevel-raised"
            style={{
              padding: "8px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "8px",
              transition: "transform 0.15s ease"
            }}
          >
            <div>
              {/* Header: Icon + Category tag */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px dotted #999",
                  paddingBottom: "4px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "20px" }}>💾</span>
                  <span
                    style={{
                      fontFamily: "var(--font-silkscreen)",
                      fontSize: "12px",
                      color: "#000080"
                    }}
                  >
                    {p.title}
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor: "#ffe500",
                    color: "#000",
                    fontFamily: "var(--font-pixel)",
                    fontSize: "10px",
                    padding: "1px 4px",
                    borderRadius: "2px",
                    border: "1px solid #000"
                  }}
                >
                  {p.category}
                </span>
              </div>

              {/* Subtitle */}
              <div
                style={{
                  fontSize: "11px",
                  color: "#555",
                  fontWeight: 600,
                  marginTop: "6px"
                }}
              >
                {p.subtitle}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1.4",
                  color: "#222",
                  marginTop: "6px"
                }}
              >
                {p.description}
              </p>

              {/* Tech Badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  marginTop: "8px"
                }}
              >
                {p.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="bevel-sunken"
                    style={{
                      fontSize: "10px",
                      padding: "1px 5px",
                      backgroundColor: "#fff",
                      fontFamily: "var(--font-pixel)",
                      color: "#000080"
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                paddingTop: "6px",
                borderTop: "1px solid #dfdfdf"
              }}
            >
              {p.demoUrl && (
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bevel-button"
                  style={{
                    flex: 1,
                    textDecoration: "none",
                    color: "#000",
                    fontSize: "11px",
                    fontWeight: "bold",
                    backgroundColor: "#e8f5e9"
                  }}
                >
                  🚀 Demo
                </a>
              )}
              {p.githubUrl && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bevel-button"
                  style={{
                    flex: 1,
                    textDecoration: "none",
                    color: "#000",
                    fontSize: "11px",
                    backgroundColor: "#f5f5f5"
                  }}
                >
                  🐙 GitHub
                </a>
              )}
              <button
                type="button"
                className="bevel-button"
                onClick={() => setActiveProject(p)}
                style={{ fontSize: "11px" }}
                title="View Full Case Specs"
              >
                📄 Specs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Details Modal Dialog */}
      {activeProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
          }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bevel-raised shadow-2xl"
            style={{
              width: "480px",
              maxWidth: "100%",
              backgroundColor: "#c0c0c0",
              padding: "3px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="win-titlebar">
              <span>PROPERTIES: {activeProject.title}</span>
              <button
                type="button"
                className="win-btn"
                onClick={() => setActiveProject(null)}
              >
                ✕
              </button>
            </div>
            <div
              className="bevel-sunken"
              style={{
                backgroundColor: "#fff",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}
            >
              <h3 style={{ fontFamily: "var(--font-silkscreen)", color: "#000080" }}>
                {activeProject.title}
              </h3>
              <p style={{ fontSize: "12px", color: "#666" }}>{activeProject.subtitle}</p>
              <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
              <p style={{ fontSize: "13px", lineHeight: "1.5" }}>
                {activeProject.longDescription || activeProject.description}
              </p>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: "bold" }}>Tech Architecture:</span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                  {activeProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#ffe500",
                        color: "#000",
                        fontSize: "11px",
                        padding: "2px 6px",
                        border: "1px solid #000"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                <button
                  type="button"
                  className="bevel-button"
                  onClick={() => setActiveProject(null)}
                  style={{ minWidth: "70px" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div
        className="bevel-raised"
        style={{
          padding: "2px 8px",
          fontSize: "11px",
          fontFamily: "var(--font-pixel)",
          color: "#444",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080"
        }}
      >
        <span>{filteredProjects.length} object(s) found</span>
        <span>Disk Space: 412 MB Available</span>
      </div>
    </div>
  );
};
