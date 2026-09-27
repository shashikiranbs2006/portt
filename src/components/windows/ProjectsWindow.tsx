import React, { useState } from "react";
import { portfolioData, type Project } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

export const ProjectsWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Interactive Multi-Tenant Simulation State
  const [simulatedOrg, setSimulatedOrg] = useState<number>(101);
  const [simulatedAttack, setSimulatedAttack] = useState<boolean>(false);
  const [queryOutput, setQueryOutput] = useState<string | null>(null);

  // Interactive LLM Router State
  const [activeLLM, setActiveLLM] = useState<string>("Claude 3.5 Sonnet (Primary)");
  const [quotaDepleted, setQuotaDepleted] = useState<boolean>(false);
  const [routerLog, setRouterLog] = useState<string[]>([]);

  // Interactive RAG State
  const [ragQuery, setRagQuery] = useState<string>("Cascading foreign keys");
  const [ragResult, setRagResult] = useState<{ latency: string; score: number; snippet: string } | null>(null);

  const categories = [
    "All",
    "Backend & Systems",
    "Agentic AI",
    "Cloud & DevOps",
    "Tooling"
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === selectedCategory);

  const runTenantSimulation = () => {
    retroAudio.playDriveRead();
    if (simulatedAttack) {
      retroAudio.playErrorChord();
      setQueryOutput(
        `🚨 [SECURITY ENFORCEMENT]\nHTTP 403 FORBIDDEN\nTenantContextMismatchError: Attempted cross-tenant query across org_id=${simulatedOrg}.\nQuery aborted at query-builder layer before hitting PostgreSQL instance.\nZero rows exposed. Audit log event recorded.`
      );
    } else {
      retroAudio.playClick(1.2);
      const companyName = simulatedOrg === 101 ? "Acme Corp" : simulatedOrg === 202 ? "Wayne Enterprises" : "Cyberdyne Systems";
      setQueryOutput(
        `✅ [QUERY EXECUTION SUCCESS]\nSQL: SELECT id, title, status, assigned_to, org_id FROM tickets WHERE org_id = ${simulatedOrg} ORDER BY created_at DESC LIMIT 10;\nIndex Used: idx_tickets_org_status on (org_id, status)\nExecution Time: 1.42ms (Testcontainers Postgres)\nResults: 3 tickets isolated strictly for ${companyName} (org_id: ${simulatedOrg}).\nCross-Tenant Leakage: 0.00%`
      );
    }
  };

  const runLLMRouting = () => {
    retroAudio.playClick(1.1);
    if (!quotaDepleted) {
      setQuotaDepleted(true);
      setActiveLLM("AWS Bedrock (Llama 3 70B Failover)");
      setRouterLog([
        "⚠️ Primary Provider 429 Quota Exceeded detected",
        "🔄 Compression Pipeline invoked: Session token reduced (4,820 -> 1,190 tokens)",
        "⚡ Handoff successful to AWS Bedrock sandbox in 118ms",
        "🎯 Session continuity 100% preserved"
      ]);
    } else {
      setQuotaDepleted(false);
      setActiveLLM("Claude 3.5 Sonnet (Primary)");
      setRouterLog(["✅ Provider quotas reset", "Routing priority restored to Primary queue"]);
    }
  };

  const runRAGSearch = (q: string) => {
    retroAudio.playDriveRead();
    setRagQuery(q);
    setTimeout(() => {
      setRagResult({
        latency: "1.48s (< 2.0s SLA)",
        score: 0.942,
        snippet: `[ChromaDB Chunk #42] "In relational schema design, ON DELETE CASCADE maintains referential integrity by automatically purging child records when parent org_id partitions are dropped, preventing orphan foreign key leaks across tenant boundaries."`
      });
    }, 250);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f5f5f5",
        fontFamily: "var(--font-sans)",
        userSelect: "none"
      }}
    >
      {/* Explorer Address Bar */}
      <div
        className="bevel-sunken"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 8px",
          backgroundColor: "#fff",
          fontSize: "12px",
          borderBottom: "1px solid #c0c0c0"
        }}
      >
        <span style={{ color: "#666", fontWeight: "bold" }}>Address</span>
        <div
          className="bevel-sunken"
          style={{
            flex: 1,
            padding: "2px 6px",
            backgroundColor: "#fff",
            fontFamily: "var(--font-pixel)",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <span>📁</span>
          <span style={{ color: "#000080", fontWeight: "bold" }}>C:\PORTFOLIO\AUTHENTIC_PROJECTS_ARCHIVE\</span>
        </div>
        <button
          type="button"
          className="bevel-button"
          onClick={() => {
            retroAudio.playClick(1.0);
            setSelectedCategory("All");
          }}
          style={{ fontSize: "11px", padding: "1px 6px" }}
        >
          Reset Filter
        </button>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "6px 8px",
          backgroundColor: "#e0e0e0",
          borderBottom: "1px solid #b0b0b0",
          overflowX: "auto"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`bevel-button ${selectedCategory === cat ? "active font-bold" : ""}`}
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              backgroundColor: selectedCategory === cat ? "#fff" : "#e0e0e0"
            }}
            onClick={() => {
              retroAudio.playClick(1.0);
              setSelectedCategory(cat);
            }}
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
          gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
          gap: "12px",
          backgroundColor: "#dfdfdf"
        }}
      >
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bevel-raised"
            style={{
              padding: "10px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "8px",
              border: "1px solid #fff"
            }}
          >
            <div>
              {/* Header: Icon + Category tag */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px dotted #888",
                  paddingBottom: "5px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "18px" }}>
                    {p.id === "proj-multi-tenant" ? "🏢" : p.id === "proj-relay-ai" ? "🤖" : p.id === "proj-edurag" ? "📚" : "🏷️"}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-silkscreen)",
                      fontSize: "12px",
                      color: "#000080",
                      fontWeight: "bold"
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
                    fontSize: "9px",
                    padding: "2px 6px",
                    fontWeight: "bold",
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
                  color: "#d91e18",
                  fontWeight: 700,
                  marginTop: "6px",
                  fontFamily: "var(--font-display)"
                }}
              >
                {p.subtitle}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: "1.45",
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
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="bevel-sunken"
                    style={{
                      fontSize: "10px",
                      padding: "1px 6px",
                      backgroundColor: "#fff",
                      fontFamily: "var(--font-pixel)",
                      color: "#000080",
                      fontWeight: 600
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
                paddingTop: "8px",
                borderTop: "1px solid #dfdfdf"
              }}
            >
              <button
                type="button"
                className="bevel-button"
                onClick={() => {
                  retroAudio.playClick(1.2);
                  setActiveProject(p);
                }}
                style={{
                  flex: 1,
                  fontSize: "11px",
                  fontWeight: "bold",
                  backgroundColor: "#ffe500",
                  color: "#000",
                  padding: "4px 8px"
                }}
              >
                ⚡ Live Architecture & Playground
              </button>
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
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  🐙 Repo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Case Study & Interactive Playground Dialog */}
      {activeProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.65)",
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
            className="bevel-raised shadow-2xl"
            style={{
              width: "620px",
              maxWidth: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#c0c0c0",
              padding: "3px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Titlebar */}
            <div className="win-titlebar">
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span>💾</span>
                <span>SYSTEM_SPEC: {activeProject.title}</span>
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
                padding: "14px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
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
                <div style={{ fontSize: "12px", color: "#d91e18", fontWeight: 700, marginTop: "2px" }}>
                  {activeProject.subtitle}
                </div>
              </div>

              <div
                style={{
                  fontSize: "12px",
                  lineHeight: "1.5",
                  backgroundColor: "#f7f7f7",
                  padding: "8px",
                  borderLeft: "3px solid #000080"
                }}
              >
                {activeProject.longDescription}
              </div>

              {/* ===== INTERACTIVE PLAYGROUND PER PROJECT ===== */}
              {activeProject.id === "proj-multi-tenant" && (
                <div
                  className="bevel-sunken"
                  style={{
                    backgroundColor: "#111",
                    color: "#39ff14",
                    padding: "10px",
                    fontFamily: "var(--font-pixel)",
                    fontSize: "11px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  <div style={{ color: "#ffe500", fontWeight: "bold" }}>
                    ★ INTERACTIVE TENANT ISOLATION SIMULATOR:
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <span>Active Tenant Context:</span>
                    {[
                      { id: 101, name: "Acme Corp (101)" },
                      { id: 202, name: "Wayne Ent (202)" },
                      { id: 303, name: "Cyberdyne (303)" }
                    ].map((org) => (
                      <button
                        key={org.id}
                        type="button"
                        onClick={() => {
                          setSimulatedOrg(org.id);
                          setQueryOutput(null);
                        }}
                        style={{
                          background: simulatedOrg === org.id ? "#39ff14" : "#222",
                          color: simulatedOrg === org.id ? "#000" : "#fff",
                          border: "1px solid #39ff14",
                          padding: "2px 6px",
                          cursor: "pointer",
                          fontFamily: "var(--font-pixel)"
                        }}
                      >
                        {org.name}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "4px", color: simulatedAttack ? "#ff4444" : "#ccc" }}>
                      <input
                        type="checkbox"
                        checked={simulatedAttack}
                        onChange={(e) => {
                          setSimulatedAttack(e.target.checked);
                          setQueryOutput(null);
                        }}
                      />
                      <span>Inject Cross-Tenant Header Attack (Spoof another org_id)</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={runTenantSimulation}
                    style={{
                      background: simulatedAttack ? "#ff3333" : "#ffe500",
                      color: "#000",
                      fontWeight: "bold",
                      border: "none",
                      padding: "4px 10px",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)"
                    }}
                  >
                    ▶ EXECUTE SCOPED QUERY
                  </button>

                  {queryOutput && (
                    <pre
                      style={{
                        margin: 0,
                        backgroundColor: "#000",
                        padding: "8px",
                        border: "1px dashed rgba(57,255,20,0.4)",
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.4"
                      }}
                    >
                      {queryOutput}
                    </pre>
                  )}
                </div>
              )}

              {activeProject.id === "proj-relay-ai" && (
                <div
                  className="bevel-sunken"
                  style={{
                    backgroundColor: "#111",
                    color: "#39ff14",
                    padding: "10px",
                    fontFamily: "var(--font-pixel)",
                    fontSize: "11px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  <div style={{ color: "#ffe500", fontWeight: "bold" }}>
                    ★ INTERACTIVE LLM FAILOVER ROUTER:
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Active Provider: <b style={{ color: "#fff" }}>{activeLLM}</b></span>
                    <span style={{ color: quotaDepleted ? "#ff4444" : "#39ff14" }}>
                      Quota: {quotaDepleted ? "EXHAUSTED (429)" : "ACTIVE (100k TPM)"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={runLLMRouting}
                    style={{
                      background: quotaDepleted ? "#39ff14" : "#ff4444",
                      color: "#000",
                      fontWeight: "bold",
                      border: "none",
                      padding: "4px 10px",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)"
                    }}
                  >
                    {quotaDepleted ? "🔄 RESET PROVIDER QUOTA" : "⚡ TRIGGER 429 RATE LIMIT FAILOVER"}
                  </button>

                  {routerLog.length > 0 && (
                    <div style={{ backgroundColor: "#000", padding: "6px", border: "1px solid #333" }}>
                      {routerLog.map((log, idx) => (
                        <div key={idx} style={{ color: log.startsWith("⚠️") ? "#ffaa00" : "#39ff14" }}>
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeProject.id === "proj-edurag" && (
                <div
                  className="bevel-sunken"
                  style={{
                    backgroundColor: "#111",
                    color: "#39ff14",
                    padding: "10px",
                    fontFamily: "var(--font-pixel)",
                    fontSize: "11px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  <div style={{ color: "#ffe500", fontWeight: "bold" }}>
                    ★ INTERACTIVE VECTOR RETRIEVAL TESTER:
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {["Cascading foreign keys", "BM25 reranker", "Sub-2s SLA latency"].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => runRAGSearch(preset)}
                        style={{
                          background: ragQuery === preset ? "#ffe500" : "#222",
                          color: ragQuery === preset ? "#000" : "#fff",
                          border: "1px solid #ffe500",
                          padding: "2px 6px",
                          cursor: "pointer",
                          fontFamily: "var(--font-pixel)"
                        }}
                      >
                        🔎 {preset}
                      </button>
                    ))}
                  </div>

                  {ragResult && (
                    <div style={{ backgroundColor: "#000", padding: "8px", border: "1px solid #39ff14" }}>
                      <div style={{ color: "#ffe500" }}>Latency: {ragResult.latency} | Similarity: {ragResult.score}</div>
                      <div style={{ marginTop: "4px", color: "#fff" }}>{ragResult.snippet}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Tech Stack Breakdown */}
              <div>
                <span style={{ fontSize: "11px", fontWeight: "bold" }}>Engineering Stack:</span>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        backgroundColor: "#ffe500",
                        color: "#000",
                        fontSize: "11px",
                        padding: "2px 6px",
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
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
                <button
                  type="button"
                  className="bevel-button"
                  onClick={() => {
                    retroAudio.playClick(0.9);
                    setActiveProject(null);
                  }}
                  style={{ minWidth: "80px", fontWeight: "bold" }}
                >
                  CLOSE
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
          padding: "3px 8px",
          fontSize: "11px",
          fontFamily: "var(--font-pixel)",
          color: "#222",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080"
        }}
      >
        <span>{filteredProjects.length} authentic project(s) ready</span>
        <span>PostgreSQL · Testcontainers · AWS Bedrock</span>
      </div>
    </div>
  );
};
