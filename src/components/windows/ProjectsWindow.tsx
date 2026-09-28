import React, { useState } from "react";
import { portfolioData, type Project } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

export const ProjectsWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Interactive NIRMAAN 2026 Evaluation State
  const [nirmaanScores, setNirmaanScores] = useState({ architecture: 9.0, innovation: 8.5, impact: 9.0 });

  // Interactive Prompt Compiler State
  const [rawPromptInput, setRawPromptInput] = useState<string>("Write an index optimization plan for multi-tenant PostgreSQL queries where org_id and status are queried together.");
  const [compiledPromptResult, setCompiledPromptResult] = useState<{ originalTokens: number; compiledTokens: number; reduction: string; output: string } | null>(null);

  // Interactive Credit Card Fraud Detection State
  const [fraudAmount, setFraudAmount] = useState<number>(3420);
  const [isOffshore, setIsOffshore] = useState<boolean>(true);
  const [isBurstVelocity, setIsBurstVelocity] = useState<boolean>(true);
  const [isMidnight, setIsMidnight] = useState<boolean>(false);
  const [fraudResult, setFraudResult] = useState<{ riskScore: number; status: "FLAGGED_FRAUD" | "LEGITIMATE"; inferenceMs: number; flags: string[] } | null>(null);

  // Interactive FitPhile State
  const [fitnessGoal, setFitnessGoal] = useState<"Hypertrophy" | "Fat Loss" | "Endurance">("Hypertrophy");
  const [userWeightKg, setUserWeightKg] = useState<number>(74);
  const [fitphilePlan, setFitphilePlan] = useState<{ calories: number; protein: number; carbs: number; fats: number; split: string } | null>(null);

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

  const runPromptCompiler = () => {
    retroAudio.playDriveRead();
    const rawWords = rawPromptInput.trim().split(/\s+/).filter(Boolean).length;
    const rawTokens = Math.max(28, Math.round(rawWords * 1.35) + 32);
    const compiledTokens = Math.round(rawTokens * 0.64);
    const reduction = (((rawTokens - compiledTokens) / rawTokens) * 100).toFixed(1);
    setCompiledPromptResult({
      originalTokens: rawTokens,
      compiledTokens: compiledTokens,
      reduction: `-${reduction}%`,
      output: `<system_directive>\n  <role>Senior Staff Software Engineer & Systems Architect</role>\n  <context>Deterministic Execution Sandbox</context>\n  <task_specification>\n    ${rawPromptInput.trim()}\n  </task_specification>\n  <constraints>\n    - Fail-by-construction architectural guarantees\n    - Zero cross-context leakage\n    - Enforce verified type contracts & edge validation\n  </constraints>\n  <output_schema format="structured_xml" />\n</system_directive>`
    });
  };

  const runFraudDetector = () => {
    retroAudio.playDriveRead();
    let score = 0.04;
    const flags: string[] = [];
    if (fraudAmount > 2000) {
      score += 0.34;
      flags.push(`Amount ($${fraudAmount.toLocaleString()}) exceeds 3σ deviation threshold`);
    } else if (fraudAmount > 500) {
      score += 0.12;
    }
    if (isOffshore) {
      score += 0.38;
      flags.push("High-risk foreign proxy IP / TOR exit node detected");
    }
    if (isBurstVelocity) {
      score += 0.26;
      flags.push("Burst velocity alert: 8 transactions in past 90 seconds");
    }
    if (isMidnight) {
      score += 0.14;
      flags.push("Off-hours circadian anomaly (03:42 AM local device time)");
    }
    const finalScore = Math.min(0.998, score);
    const isFraud = finalScore >= 0.5;
    if (isFraud) {
      retroAudio.playErrorChord();
    } else {
      retroAudio.playClick(1.2);
    }
    setFraudResult({
      riskScore: finalScore,
      status: isFraud ? "FLAGGED_FRAUD" : "LEGITIMATE",
      inferenceMs: 6.4,
      flags: flags.length > 0 ? flags : ["All parameters within baseline normality (99.8% confidence)"]
    });
  };

  const runFitPhileCalc = () => {
    retroAudio.playClick(1.2);
    let cals = userWeightKg * 33;
    let split = "Push / Pull / Legs (PPL) 5-day cycle";
    if (fitnessGoal === "Hypertrophy") {
      cals = Math.round(userWeightKg * 36);
      split = "Upper / Lower + Push / Pull / Legs (5-Day Hypertrophy)";
    } else if (fitnessGoal === "Fat Loss") {
      cals = Math.round(userWeightKg * 26);
      split = "4-Day Full Body & Zone-2 Cardio Conditioning";
    } else {
      cals = Math.round(userWeightKg * 31);
      split = "Hybrid Aerobic & Functional Compound Volume (5-Day)";
    }
    const protein = Math.round(userWeightKg * 2.2);
    const fats = Math.round(userWeightKg * 0.9);
    const carbs = Math.round((cals - (protein * 4 + fats * 9)) / 4);
    setFitphilePlan({
      calories: cals,
      protein,
      carbs,
      fats,
      split
    });
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
      {/* Explorer Address Bar with Live Search */}
      <div
        className="bevel-sunken"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 8px",
          backgroundColor: "#fff",
          fontSize: "12px",
          borderBottom: "1px solid #c0c0c0",
          flexWrap: "wrap"
        }}
      >
        <span style={{ color: "#666", fontWeight: "bold" }}>Address</span>
        <div
          className="bevel-sunken"
          style={{
            flex: 1,
            minWidth: "200px",
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

        {/* Live Filter / Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "11px", color: "#555" }}>🔍 Filter:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech or title..."
            style={{
              padding: "2px 6px",
              fontSize: "11px",
              border: "1px solid #808080",
              borderRadius: "0",
              outline: "none",
              width: "140px",
              fontFamily: "var(--font-pixel)"
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
              style={{ fontSize: "10px", padding: "1px 5px" }}
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="button"
          className="bevel-button"
          onClick={() => {
            retroAudio.playClick(1.0);
            setSelectedCategory("All");
            setSearchQuery("");
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
            className={`bevel-button ${selectedCategory === cat ? "active" : ""}`}
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              backgroundColor: selectedCategory === cat ? "#fff" : "#e0e0e0",
              fontWeight: selectedCategory === cat ? 700 : 400
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
        {filteredProjects.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "36px",
              color: "#666",
              fontFamily: "var(--font-pixel)",
              fontSize: "12px"
            }}
          >
            No projects found matching "{searchQuery}".
            <div style={{ marginTop: "8px" }}>
              <button
                type="button"
                className="bevel-button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                style={{ padding: "3px 10px" }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          filteredProjects.map((p) => (
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
                border: "1px solid #fff",
                position: "relative"
              }}
            >
              {p.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    right: "-1px",
                    backgroundColor: "#ff3b30",
                    color: "#fff",
                    fontFamily: "var(--font-silkscreen)",
                    fontSize: "8px",
                    padding: "1px 5px",
                    letterSpacing: "0.5px"
                  }}
                >
                  ★ FEATURED
                </div>
              )}

              <div>
                {/* Header: Icon + Category tag */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px dotted #888",
                    paddingBottom: "5px",
                    paddingRight: p.featured ? "60px" : "0"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "18px" }}>
                      {p.id === "proj-relay-ai" ? "🤖" :
                       p.id === "proj-edurag" ? "📚" :
                       p.id === "proj-prompt-compiler" ? "⚡" :
                       p.id === "proj-credit-card" ? "💳" :
                       p.id === "proj-fitphile" ? "🏋️" :
                       p.id === "proj-multi-tenant" ? "🏢" : "🏆"}
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
                  gap: "5px",
                  paddingTop: "8px",
                  borderTop: "1px solid #dfdfdf",
                  flexWrap: "wrap"
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
                    flex: "1 1 auto",
                    fontSize: "11px",
                    fontWeight: "bold",
                    backgroundColor: "#ffe500",
                    color: "#000",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px"
                  }}
                >
                  ⚡ Simulator & Spec
                </button>
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bevel-button"
                    onClick={() => retroAudio.playClick(1.1)}
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "11px",
                      fontWeight: "bold",
                      backgroundColor: "#39ff14",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px"
                    }}
                  >
                    🚀 Live App
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
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px"
                    }}
                  >
                    🐙 Repo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
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
            className="bevel-raised"
            style={{
              width: "640px",
              maxWidth: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#c0c0c0",
              padding: "3px",
              boxShadow: "8px 8px 0px rgba(0,0,0,0.6)"
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

              {/* Direct Deployment & Repo Action Bar */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
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
                      padding: "6px 12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    🚀 Open Live Deployment ({activeProject.demoUrl.replace("https://", "").replace(/\/$/, "")})
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
                      padding: "6px 12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    🐙 View GitHub Repository
                  </a>
                )}
              </div>

              {/* Platform Specific Deployment Notes */}
              {activeProject.id === "proj-relay-ai" && (
                <div style={{ backgroundColor: "#e6f7ff", border: "1px solid #1890ff", padding: "6px 10px", fontSize: "11px", color: "#0050b3", lineHeight: 1.4 }}>
                  ℹ️ <b>VS Code Extension:</b> An interactive web simulation is deployed at{" "}
                  <a href="https://relay-jofk.vercel.app/" target="_blank" rel="noreferrer" style={{ color: "#0050b3", fontWeight: "bold" }}>
                    relay-jofk.vercel.app
                  </a>
                  . Full VS Code extension unpackaged / VSIX available in the GitHub repository.
                </div>
              )}

              {activeProject.id === "proj-prompt-compiler" && (
                <div style={{ backgroundColor: "#f6ffed", border: "1px solid #52c41a", padding: "6px 10px", fontSize: "11px", color: "#237804", lineHeight: 1.4 }}>
                  ℹ️ <b>Google Chrome Extension:</b> An interactive web simulation is deployed at{" "}
                  <a href="https://prompt-compiler-five.vercel.app/" target="_blank" rel="noreferrer" style={{ color: "#237804", fontWeight: "bold" }}>
                    prompt-compiler-five.vercel.app
                  </a>
                  . To install into Chrome, load unpackaged extension files from the GitHub repository.
                </div>
              )}

              {activeProject.id === "proj-credit-card" && (
                <div style={{ backgroundColor: "#fff7e6", border: "1px solid #fa8c16", padding: "6px 10px", fontSize: "11px", color: "#d46b08", lineHeight: 1.4 }}>
                  ℹ️ <b>ML Production Deployment:</b> Machine learning pipeline and interactive scoring web UI deployed live on{" "}
                  <a href="https://credit-card-fraud-detection-by-shashikiran.streamlit.app/" target="_blank" rel="noreferrer" style={{ color: "#d46b08", fontWeight: "bold" }}>
                    Streamlit Cloud
                  </a>
                  .
                </div>
              )}

              {activeProject.id === "proj-edurag" && (
                <div style={{ backgroundColor: "#f9f0ff", border: "1px solid #722ed1", padding: "6px 10px", fontSize: "11px", color: "#531dab", lineHeight: 1.4 }}>
                  ℹ️ <b>Educational RAG Microservice:</b> Containerized vector document retrieval API deployed live on{" "}
                  <a href="https://edu-rag.onrender.com/" target="_blank" rel="noreferrer" style={{ color: "#531dab", fontWeight: "bold" }}>
                    Render
                  </a>
                  .
                </div>
              )}

              {activeProject.id === "proj-fitphile" && (
                <div style={{ backgroundColor: "#e6fffb", border: "1px solid #13c2c2", padding: "6px 10px", fontSize: "11px", color: "#006d75", lineHeight: 1.4 }}>
                  ℹ️ <b>Full-Stack Health Platform:</b> Responsive workout logging & health telemetry platform deployed live on{" "}
                  <a href="https://fitphile.onrender.com/" target="_blank" rel="noreferrer" style={{ color: "#006d75", fontWeight: "bold" }}>
                    Render
                  </a>
                  .
                </div>
              )}

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
                    <label style={{ display: "flex", alignItems: "center", gap: "4px", color: simulatedAttack ? "#ff4444" : "#ccc", cursor: "pointer" }}>
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

              {activeProject.id === "proj-prompt-compiler" && (
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
                    ★ INTERACTIVE PROMPT COMPILER SIMULATOR:
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                    <span>Preset Directives:</span>
                    {[
                      { label: "SQL Optimizer", prompt: "Write an index optimization plan for multi-tenant PostgreSQL queries where org_id and status are queried together." },
                      { label: "Bug Resolver", prompt: "Diagnose why database connection pool is exhausting under 500 rps and eliminate socket leaks." },
                      { label: "FastAPI Spec", prompt: "Build a production-grade FastAPI microservice endpoint with strict Pydantic v2 validation and JWT auth." }
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          retroAudio.playClick(1.1);
                          setRawPromptInput(item.prompt);
                          setCompiledPromptResult(null);
                        }}
                        style={{
                          background: rawPromptInput === item.prompt ? "#ffe500" : "#222",
                          color: rawPromptInput === item.prompt ? "#000" : "#fff",
                          border: "1px solid #ffe500",
                          padding: "2px 6px",
                          cursor: "pointer",
                          fontFamily: "var(--font-pixel)",
                          fontSize: "10px"
                        }}
                      >
                        ⚡ {item.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ color: "#fff", fontSize: "10px" }}>Raw Prompt Input:</span>
                    <textarea
                      value={rawPromptInput}
                      onChange={(e) => {
                        setRawPromptInput(e.target.value);
                        setCompiledPromptResult(null);
                      }}
                      rows={3}
                      style={{
                        backgroundColor: "#000",
                        color: "#39ff14",
                        border: "1px solid #333",
                        padding: "6px",
                        fontFamily: "var(--font-pixel)",
                        fontSize: "10px",
                        resize: "vertical"
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={runPromptCompiler}
                    style={{
                      background: "#ffe500",
                      color: "#000",
                      fontWeight: "bold",
                      border: "none",
                      padding: "5px 12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)"
                    }}
                  >
                    ▶ COMPILE & STRUCTURE PROMPT
                  </button>

                  {compiledPromptResult && (
                    <div style={{ backgroundColor: "#000", padding: "8px", border: "1px dashed #39ff14", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#ffe500" }}>
                        <span>Token Compression: {compiledPromptResult.originalTokens} tokens ➔ {compiledPromptResult.compiledTokens} tokens</span>
                        <span style={{ color: "#39ff14", fontWeight: "bold" }}>{compiledPromptResult.reduction} Tokens Saved</span>
                      </div>
                      <pre
                        style={{
                          margin: 0,
                          backgroundColor: "#0a0a0a",
                          padding: "8px",
                          color: "#38bdf8",
                          whiteSpace: "pre-wrap",
                          fontSize: "10px",
                          lineHeight: "1.4",
                          border: "1px solid #222"
                        }}
                      >
                        {compiledPromptResult.output}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {activeProject.id === "proj-credit-card" && (
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
                    ★ REAL-TIME MACHINE LEARNING TRANSACTION ANOMALY SCORER:
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ color: "#fff" }}>Transaction Amount: <b style={{ color: "#ffe500" }}>${fraudAmount.toLocaleString()}</b></span>
                      <input
                        type="range"
                        min="10"
                        max="8000"
                        step="50"
                        value={fraudAmount}
                        onChange={(e) => {
                          setFraudAmount(parseInt(e.target.value, 10));
                          setFraudResult(null);
                        }}
                        style={{ accentColor: "#ffe500" }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ color: "#fff" }}>Anomaly Risk Factors:</span>
                      <label style={{ display: "flex", alignItems: "center", gap: "4px", color: isOffshore ? "#ff4444" : "#ccc", cursor: "pointer", fontSize: "10px" }}>
                        <input
                          type="checkbox"
                          checked={isOffshore}
                          onChange={(e) => {
                            setIsOffshore(e.target.checked);
                            setFraudResult(null);
                          }}
                        />
                        <span>Foreign High-Risk IP Proxy</span>
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "4px", color: isBurstVelocity ? "#ff4444" : "#ccc", cursor: "pointer", fontSize: "10px" }}>
                        <input
                          type="checkbox"
                          checked={isBurstVelocity}
                          onChange={(e) => {
                            setIsBurstVelocity(e.target.checked);
                            setFraudResult(null);
                          }}
                        />
                        <span>Burst Velocity (&gt; 5 tx / min)</span>
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "4px", color: isMidnight ? "#ffaa00" : "#ccc", cursor: "pointer", fontSize: "10px" }}>
                        <input
                          type="checkbox"
                          checked={isMidnight}
                          onChange={(e) => {
                            setIsMidnight(e.target.checked);
                            setFraudResult(null);
                          }}
                        />
                        <span>Off-Hours Timestamp (03:42 AM)</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runFraudDetector}
                    style={{
                      background: "#ffe500",
                      color: "#000",
                      fontWeight: "bold",
                      border: "none",
                      padding: "5px 12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)"
                    }}
                  >
                    ▶ RUN ML ANOMALY INFERENCE (XGBoost + SMOTE)
                  </button>

                  {fraudResult && (
                    <div
                      style={{
                        backgroundColor: "#000",
                        padding: "8px",
                        border: fraudResult.status === "FLAGGED_FRAUD" ? "1px solid #ff3333" : "1px solid #39ff14"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: fraudResult.status === "FLAGGED_FRAUD" ? "#ff3333" : "#39ff14", fontWeight: "bold" }}>
                          {fraudResult.status === "FLAGGED_FRAUD" ? "🚨 BLOCKED: HIGH-CONFIDENCE FRAUD ANOMALY" : "✅ APPROVED: NORMAL TRANSACTION"}
                        </span>
                        <span style={{ color: "#ffe500" }}>Inference: {fraudResult.inferenceMs}ms</span>
                      </div>
                      <div style={{ marginTop: "4px", color: "#fff", fontSize: "10px" }}>
                        Anomaly Probability: <b style={{ color: fraudResult.status === "FLAGGED_FRAUD" ? "#ff4444" : "#39ff14" }}>{(fraudResult.riskScore * 100).toFixed(1)}%</b>
                      </div>
                      <div style={{ marginTop: "4px", color: "#aaa", fontSize: "9px" }}>
                        Feature Telemetry:
                        {fraudResult.flags.map((fl, idx) => (
                          <div key={idx} style={{ color: fraudResult.status === "FLAGGED_FRAUD" ? "#ffaa00" : "#39ff14" }}>
                            • {fl}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeProject.id === "proj-fitphile" && (
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
                    ★ FITPHILE TELEMETRY & NUTRITION ENGINE:
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <span>Target Directive:</span>
                    {(["Hypertrophy", "Fat Loss", "Endurance"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          retroAudio.playClick(1.1);
                          setFitnessGoal(g);
                        }}
                        style={{
                          background: fitnessGoal === g ? "#ffe500" : "#222",
                          color: fitnessGoal === g ? "#000" : "#fff",
                          border: "1px solid #ffe500",
                          padding: "2px 8px",
                          cursor: "pointer",
                          fontFamily: "var(--font-pixel)",
                          fontSize: "10px"
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#fff" }}>Bodyweight: <b style={{ color: "#ffe500" }}>{userWeightKg} kg</b></span>
                    <input
                      type="range"
                      min="50"
                      max="110"
                      value={userWeightKg}
                      onChange={(e) => setUserWeightKg(parseInt(e.target.value, 10))}
                      style={{ flex: 1, accentColor: "#ffe500" }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={runFitPhileCalc}
                    style={{
                      background: "#ffe500",
                      color: "#000",
                      fontWeight: "bold",
                      border: "none",
                      padding: "5px 12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)"
                    }}
                  >
                    ▶ GENERATE WORKOUT & NUTRITIONAL PROFILE
                  </button>

                  {fitphilePlan && (
                    <div style={{ backgroundColor: "#000", padding: "8px", border: "1px dashed #39ff14", display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ color: "#ffe500", fontWeight: "bold" }}>Daily Caloric Budget: {fitphilePlan.calories} kcal</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px", fontSize: "10px", color: "#38bdf8" }}>
                        <div>🥩 Protein: <b>{fitphilePlan.protein}g</b></div>
                        <div>🍚 Carbs: <b>{fitphilePlan.carbs}g</b></div>
                        <div>🥑 Fats: <b>{fitphilePlan.fats}g</b></div>
                      </div>
                      <div style={{ marginTop: "4px", color: "#fff", fontSize: "10px" }}>
                        Recommended Protocol: <b style={{ color: "#39ff14" }}>{fitphilePlan.split}</b>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeProject.id === "proj-nirmaan" && (
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
                    ★ NIRMAAN 2026 LIVE EVALUATION RUBRIC SIMULATOR:
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", color: "#ccc", fontSize: "10px" }}>
                    <div>Participants: <b style={{ color: "#fff" }}>200+ Developers</b></div>
                    <div>Prize Pool: <b style={{ color: "#ffe500" }}>₹1,00,000</b></div>
                    <div>Sponsor Orgs: <b style={{ color: "#00a0e9" }}>52 Tech Partners</b></div>
                    <div>Hackathon Budget: <b style={{ color: "#39ff14" }}>₹3,00,000</b></div>
                  </div>

                  {/* Rubric Sliders */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                    {[
                      { label: "Technical Architecture (40%)", key: "architecture" as const, val: nirmaanScores.architecture },
                      { label: "Originality & Innovation (30%)", key: "innovation" as const, val: nirmaanScores.innovation },
                      { label: "Real-World Impact (30%)", key: "impact" as const, val: nirmaanScores.impact }
                    ].map((item) => (
                      <div key={item.key} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px" }}>
                        <span style={{ width: "170px", color: "#fff" }}>{item.label}:</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={item.val}
                          onChange={(e) => {
                            retroAudio.playClick(1.1);
                            setNirmaanScores((prev) => ({ ...prev, [item.key]: parseFloat(e.target.value) }));
                          }}
                          style={{ flex: 1, accentColor: "#ffe500" }}
                        />
                        <span style={{ width: "36px", textAlign: "right", color: "#ffe500", fontWeight: "bold" }}>
                          {item.val.toFixed(1)}/10
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculated Score */}
                  {(() => {
                    const weighted = (nirmaanScores.architecture * 0.4 + nirmaanScores.innovation * 0.3 + nirmaanScores.impact * 0.3).toFixed(2);
                    const tier =
                      parseFloat(weighted) >= 8.5
                        ? "🥇 Tier 1: Grand Finalist / Podium Candidate"
                        : parseFloat(weighted) >= 7.0
                        ? "🥈 Tier 2: Honorable Mention Track"
                        : "🥉 Tier 3: Participant Certificate";
                    return (
                      <div style={{ backgroundColor: "#000", padding: "8px", border: "1px dashed #39ff14", marginTop: "4px" }}>
                        <div style={{ color: "#ffe500", fontWeight: "bold" }}>
                          Computed Rubric Score: {weighted} / 10.00
                        </div>
                        <div style={{ color: "#fff", fontSize: "10px", marginTop: "2px" }}>
                          Judges' Classification: {tier}
                        </div>
                      </div>
                    );
                  })()}
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
        <span>Vercel · Render · Streamlit · AWS Bedrock · GitHub</span>
      </div>
    </div>
  );
};
