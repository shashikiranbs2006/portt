import React, { useState } from "react";
import { portfolioData } from "../../data/portfolioData";

export const ContactPhoneWindow: React.FC = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentStatus, setSentStatus] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<"home" | "sms" | "contacts">("home");

  const { contact } = portfolioData;

  const handleSendSMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) {
      alert("Enter your name and message!");
      return;
    }
    const subject = encodeURIComponent(`Portfolio SMS from ${senderName}`);
    const body = encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`);
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
    setSentStatus("SENT ★");
    setTimeout(() => { setSentStatus(null); setActiveScreen("home"); }, 4000);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d12 100%)",
        overflow: "hidden"
      }}
      className="bevel-sunken"
    >
      {/* ===== THE RAZR PHONE FRAME ===== */}
      <div style={{
        position: "relative",
        width: "300px",
        height: "420px",
        flexShrink: 0
      }}>
        {/* Real RAZR photo as background */}
        <img
          src="/razr.jpg"
          alt="Motorola RAZR V3"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            filter: "drop-shadow(0 12px 30px rgba(0,100,255,0.6))",
            userSelect: "none",
            pointerEvents: "none"
          }}
        />

        {/* Screen overlay — positioned ON the phone screen area */}
        {/* The RAZR image has screen roughly at top 45% of image, centered */}
        <div style={{
          position: "absolute",
          top: "7%",
          left: "17%",
          width: "66%",
          height: "38%",
          borderRadius: "4px",
          overflow: "hidden",
          zIndex: 10
        }}>
          {/* LCD screen content */}
          <div style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #001505, #002810)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            color: "#39ff14",
            overflow: "hidden"
          }}>
            {/* Status bar */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "3px 6px",
              background: "rgba(0,0,0,0.5)",
              fontSize: "9px",
              borderBottom: "1px solid rgba(57,255,20,0.2)"
            }}>
              <span>▌▌▌▌</span>
              <span style={{ color: "#fff", fontSize: "9px" }}>12:17</span>
              <span>▓▓▓▓</span>
            </div>

            {/* Screen content based on state */}
            {activeScreen === "home" && (
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "6px"
              }}>
                <div style={{ fontSize: "16px" }}>📱</div>
                <div style={{ fontSize: "10px", textAlign: "center", lineHeight: 1.3, color: "#39ff14" }}>
                  SHASHI_KIRAN<br/>
                  <span style={{ color: "rgba(57,255,20,0.5)", fontSize: "8px" }}>tap below to contact</span>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <button
                    onClick={() => setActiveScreen("sms")}
                    style={{ background: "rgba(57,255,20,0.2)", border: "1px solid #39ff14", color: "#39ff14", padding: "2px 5px", fontSize: "8px", cursor: "pointer", fontFamily: "var(--font-pixel)" }}
                  >MSG</button>
                  <button
                    onClick={() => setActiveScreen("contacts")}
                    style={{ background: "rgba(57,255,20,0.2)", border: "1px solid #39ff14", color: "#39ff14", padding: "2px 5px", fontSize: "8px", cursor: "pointer", fontFamily: "var(--font-pixel)" }}
                  >CNT</button>
                </div>
              </div>
            )}

            {activeScreen === "sms" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "4px 5px", gap: "3px", overflowY: "auto" }}>
                {sentStatus ? (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "4px" }}>
                    <div style={{ fontSize: "16px" }}>📡</div>
                    <div style={{ fontSize: "10px", textShadow: "0 0 6px #39ff14" }}>{sentStatus}</div>
                    <div style={{ fontSize: "8px", color: "rgba(57,255,20,0.5)" }}>will reply soon</div>
                  </div>
                ) : (
                  <form onSubmit={handleSendSMS} style={{ display: "flex", flexDirection: "column", gap: "3px", height: "100%" }}>
                    <div style={{ fontSize: "8px", color: "rgba(57,255,20,0.6)" }}>NEW MESSAGE</div>
                    {[
                      { label: "NAME:", value: senderName, setter: setSenderName, type: "text", req: true },
                      { label: "EMAIL:", value: senderEmail, setter: setSenderEmail, type: "email", req: false },
                    ].map(({ label, value, setter, type, req }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <span style={{ fontSize: "7px", color: "rgba(57,255,20,0.5)", flexShrink: 0, width: "30px" }}>{label}</span>
                        <input
                          type={type}
                          value={value}
                          onChange={e => setter(e.target.value)}
                          required={req}
                          style={{
                            flex: 1,
                            padding: "1px 3px",
                            fontSize: "8px",
                            background: "rgba(0,30,10,0.9)",
                            border: "1px solid rgba(57,255,20,0.4)",
                            color: "#39ff14",
                            outline: "none",
                            fontFamily: "var(--font-pixel)"
                          }}
                        />
                      </div>
                    ))}
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                      rows={2}
                      placeholder="type msg..."
                      style={{
                        padding: "2px 3px",
                        fontSize: "8px",
                        background: "rgba(0,30,10,0.9)",
                        border: "1px solid rgba(57,255,20,0.4)",
                        color: "#39ff14",
                        outline: "none",
                        resize: "none",
                        fontFamily: "var(--font-pixel)"
                      }}
                    />
                    <div style={{ display: "flex", gap: "3px" }}>
                      <button type="submit" style={{ flex: 1, padding: "2px", background: "rgba(57,255,20,0.2)", border: "1px solid #39ff14", color: "#39ff14", fontSize: "8px", cursor: "pointer", fontFamily: "var(--font-pixel)" }}>▶SEND</button>
                      <button type="button" onClick={() => setActiveScreen("home")} style={{ padding: "2px 4px", background: "rgba(255,50,50,0.15)", border: "1px solid rgba(255,50,50,0.4)", color: "rgba(255,80,80,0.8)", fontSize: "8px", cursor: "pointer", fontFamily: "var(--font-pixel)" }}>←</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeScreen === "contacts" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "4px 5px", gap: "3px", overflowY: "auto" }}>
                <div style={{ fontSize: "8px", color: "rgba(57,255,20,0.6)", marginBottom: "2px" }}>CONTACTS</div>
                {[
                  { icon: "🐙", label: "GitHub", value: contact.github, url: `https://github.com/${contact.github}` },
                  { icon: "💼", label: "LinkedIn", value: "shashikiran-bs", url: contact.linkedin },
                  { icon: "✉️", label: "Email", value: contact.email, url: `mailto:${contact.email}` },
                ].map(item => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "3px 4px",
                      background: "rgba(57,255,20,0.08)",
                      border: "1px solid rgba(57,255,20,0.2)",
                      textDecoration: "none",
                      color: "#39ff14",
                      fontSize: "7px",
                      fontFamily: "var(--font-pixel)"
                    }}
                  >
                    <span>{item.icon}</span>
                    <div>
                      <div style={{ color: "rgba(57,255,20,0.5)", fontSize: "6px" }}>{item.label}</div>
                      <div style={{ fontSize: "7px" }}>{item.value.slice(0, 18)}</div>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: "7px" }}>→</span>
                  </a>
                ))}
                <button
                  onClick={() => setActiveScreen("home")}
                  style={{ padding: "2px", background: "transparent", border: "1px solid rgba(57,255,20,0.3)", color: "rgba(57,255,20,0.6)", fontSize: "7px", cursor: "pointer", fontFamily: "var(--font-pixel)", marginTop: "auto" }}
                >← BACK</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side instructions */}
      <div style={{
        position: "absolute",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "var(--font-pixel)",
        fontSize: "10px",
        color: "rgba(57,255,20,0.4)",
        letterSpacing: "1px",
        textAlign: "center",
        whiteSpace: "nowrap"
      }}>
        TAP PHONE SCREEN TO INTERACT
      </div>
    </div>
  );
};
