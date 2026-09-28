import React, { useState, useEffect, useCallback } from "react";
import { portfolioData } from "../../data/portfolioData";
import { retroAudio } from "../../utils/audioSystem";

export const ContactPhoneWindow: React.FC = () => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [dialedNumber, setDialedNumber] = useState("");
  const [dialStatusMsg, setDialStatusMsg] = useState<string | null>(null);
  const [sentStatus, setSentStatus] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<"home" | "sms" | "contacts" | "dialer">("home");
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const { contact } = portfolioData;

  const PRESET_MESSAGES = [
    "💼 Let's discuss Summer 2027 SWE Intern role!",
    "⚡ Loved your Relay VS Code extension & projects!",
    "🔥 Awesome portfolio! Wanted to connect with you.",
    "☕ Free for a tech chat in Bengaluru?"
  ];

  const handleKeyPress = useCallback((key: string) => {
    retroAudio.playDTMF(key);
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 150);

    if (activeScreen === "sms") {
      return;
    }

    // Otherwise dialer
    setActiveScreen("dialer");
    setDialedNumber((prev) => (prev.length < 14 ? prev + key : prev));
  }, [activeScreen]);

  const handleCallDialed = useCallback(() => {
    if (!dialedNumber) return;
    retroAudio.playClick(1.1);
    window.open(`tel:${dialedNumber}`);
  }, [dialedNumber]);

  // Easter eggs for dialed numbers
  useEffect(() => {
    if (dialedNumber === "2027") {
      retroAudio.playBootJingle();
      setDialStatusMsg("★ AMTS 2027 PASS UNLOCKED ★");
    } else if (dialedNumber === "911") {
      retroAudio.playErrorChord();
      setDialStatusMsg("🚨 EMERGENCY: HIRE SHASHI NOW!");
    } else if (dialedNumber === "87") {
      retroAudio.playClick(1.3);
      setDialStatusMsg("⚡ BMSIT CGPA 8.7/10.0 ENGINE");
    } else if (dialedNumber === "42") {
      retroAudio.playClick(1.2);
      setDialStatusMsg("🌌 THE ANSWER TO EVERYTHING");
    } else {
      setDialStatusMsg(null);
    }
  }, [dialedNumber]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in inputs or textareas
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const validKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "*", "#"];
      if (validKeys.includes(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        if (activeScreen === "dialer") {
          e.preventDefault();
          retroAudio.playClick(0.8);
          setDialedNumber((prev) => prev.slice(0, -1));
        }
      } else if (e.key === "Enter") {
        if (activeScreen === "dialer" && dialedNumber) {
          e.preventDefault();
          handleCallDialed();
        }
      } else if (e.key === "Escape") {
        if (activeScreen !== "home") {
          e.preventDefault();
          retroAudio.playClick(0.9);
          setActiveScreen("home");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScreen, dialedNumber, handleKeyPress, handleCallDialed]);

  const handleSendSMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) {
      alert("Please enter your name and message!");
      return;
    }
    retroAudio.playClick(1.3);
    const subject = encodeURIComponent(`[Portfolio SMS] Inquiry from ${senderName}`);
    const body = encodeURIComponent(
      `Hi Shashikiran,\n\nSender Name: ${senderName}\nSender Email: ${senderEmail || "Not provided"}\n\nMessage:\n${message}\n\nSent via Motorola RAZR OS Widget`
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
    setSentStatus("SMS TRANSMITTED ★");
    setTimeout(() => {
      setSentStatus(null);
      setActiveScreen("home");
      setMessage("");
      setSenderName("");
      setSenderEmail("");
    }, 3500);
  };

  const copyContact = (val: string, label: string) => {
    retroAudio.playClick(1.2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(val);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 2000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        background: "radial-gradient(ellipse at center, #111424 0%, #08090f 100%)",
        overflow: "hidden",
        position: "relative"
      }}
      className="bevel-sunken"
    >
      {/* Background Ambience Glow */}
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 150, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none"
        }}
      />

      {/* ===== THE RAZR PHONE FRAME ===== */}
      <div
        style={{
          position: "relative",
          width: "310px",
          height: "440px",
          flexShrink: 0
        }}
      >
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
            filter: "drop-shadow(0 14px 34px rgba(0,120,255,0.5))",
            userSelect: "none",
            pointerEvents: "none"
          }}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
          }}
        />

        {/* LCD SCREEN OVERLAY */}
        <div
          style={{
            position: "absolute",
            top: "7.2%",
            left: "17.5%",
            width: "65%",
            height: "37.5%",
            borderRadius: "4px",
            overflow: "hidden",
            zIndex: 10,
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(145deg, #001205 0%, #00220a 100%)",
              display: "flex",
              flexDirection: "column",
              fontFamily: "var(--font-pixel)",
              fontSize: "10px",
              color: "#39ff14",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {/* Scanline CRT texture on LCD */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 50%)",
                backgroundSize: "100% 3px",
                pointerEvents: "none",
                zIndex: 12
              }}
            />

            {/* Status bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2px 6px",
                background: "rgba(0,0,0,0.7)",
                fontSize: "8px",
                borderBottom: "1px solid rgba(57,255,20,0.25)",
                zIndex: 14
              }}
            >
              <span style={{ color: "#39ff14", letterSpacing: "1px" }}>📶 4G</span>
              <span style={{ color: "#ffe500", fontSize: "8px", fontWeight: "bold" }}>
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span style={{ color: "#39ff14" }}>🔋 98%</span>
            </div>

            {/* Screen Content Views */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 14, padding: "3px" }}>
              {activeScreen === "home" && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontSize: "13px", textShadow: "0 0 8px #39ff14" }}>★ MOTOSERVICE ★</div>
                  <div style={{ fontSize: "9px", color: "#ffe500" }}>SHASHIKIRAN B S</div>
                  <div style={{ fontSize: "7px", color: "rgba(57,255,20,0.7)" }}>
                    Bengaluru · AMTS Intern 2027
                  </div>

                  {/* Quick screen navigation buttons */}
                  <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        retroAudio.playClick(1.1);
                        setActiveScreen("sms");
                      }}
                      style={{
                        background: "rgba(57,255,20,0.2)",
                        border: "1px solid #39ff14",
                        color: "#39ff14",
                        padding: "2px 6px",
                        fontSize: "8px",
                        cursor: "pointer",
                        fontFamily: "var(--font-pixel)"
                      }}
                    >
                      ✉ SMS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        retroAudio.playClick(1.0);
                        setActiveScreen("contacts");
                      }}
                      style={{
                        background: "rgba(57,255,20,0.2)",
                        border: "1px solid #39ff14",
                        color: "#39ff14",
                        padding: "2px 6px",
                        fontSize: "8px",
                        cursor: "pointer",
                        fontFamily: "var(--font-pixel)"
                      }}
                    >
                      📇 CONT
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        retroAudio.playClick(0.9);
                        setActiveScreen("dialer");
                      }}
                      style={{
                        background: "rgba(57,255,20,0.2)",
                        border: "1px solid #39ff14",
                        color: "#39ff14",
                        padding: "2px 6px",
                        fontSize: "8px",
                        cursor: "pointer",
                        fontFamily: "var(--font-pixel)"
                      }}
                    >
                      📞 DIAL
                    </button>
                  </div>
                </div>
              )}

              {/* DIALER SCREEN */}
              {activeScreen === "dialer" && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px"
                  }}
                >
                  <div style={{ fontSize: "8px", color: "rgba(57,255,20,0.6)" }}>KEYPAD DIALER</div>
                  <div
                    style={{
                      fontSize: "14px",
                      letterSpacing: "2px",
                      color: "#fff",
                      textShadow: "0 0 8px #39ff14",
                      minHeight: "18px",
                      wordBreak: "break-all"
                    }}
                  >
                    {dialedNumber || "________"}
                  </div>

                  {/* Easter Egg Message Display */}
                  {dialStatusMsg && (
                    <div
                      style={{
                        fontSize: "7px",
                        color: "#ffe500",
                        fontFamily: "monospace",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        padding: "1px 4px",
                        border: "1px solid #ffe500",
                        animation: "blink 1s infinite"
                      }}
                    >
                      {dialStatusMsg}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      onClick={handleCallDialed}
                      style={{
                        background: "#39ff14",
                        border: "none",
                        color: "#000",
                        fontWeight: "bold",
                        padding: "2px 8px",
                        fontSize: "8px",
                        cursor: "pointer"
                      }}
                    >
                      CALL
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        retroAudio.playClick(0.8);
                        setDialedNumber((prev) => prev.slice(0, -1));
                      }}
                      style={{
                        background: "rgba(255,50,50,0.3)",
                        border: "1px solid rgba(255,80,80,0.5)",
                        color: "#ff8888",
                        padding: "2px 6px",
                        fontSize: "8px",
                        cursor: "pointer"
                      }}
                    >
                      DEL
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        retroAudio.playClick(0.9);
                        setActiveScreen("home");
                      }}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "#fff",
                        padding: "2px 6px",
                        fontSize: "8px",
                        cursor: "pointer"
                      }}
                    >
                      ESC
                    </button>
                  </div>
                </div>
              )}

              {/* SMS SCREEN */}
              {activeScreen === "sms" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3px", overflowY: "auto", padding: "2px 4px" }}>
                  {sentStatus ? (
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        gap: "4px"
                      }}
                    >
                      <div style={{ fontSize: "16px" }}>📡</div>
                      <div style={{ fontSize: "9px", textShadow: "0 0 6px #39ff14" }}>{sentStatus}</div>
                      <div style={{ fontSize: "7px", color: "rgba(57,255,20,0.6)" }}>Email client opened!</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSendSMS} style={{ display: "flex", flexDirection: "column", gap: "2px", height: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "7px", color: "rgba(57,255,20,0.6)" }}>TO: SHASHIKIRAN</span>
                        <button
                          type="button"
                          onClick={() => setActiveScreen("home")}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "rgba(255,100,100,0.8)",
                            fontSize: "8px",
                            cursor: "pointer"
                          }}
                        >
                          ✕
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Your Name..."
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        required
                        style={{
                          padding: "1px 3px",
                          fontSize: "7px",
                          background: "rgba(0,30,10,0.9)",
                          border: "1px solid rgba(57,255,20,0.4)",
                          color: "#39ff14",
                          outline: "none",
                          fontFamily: "var(--font-pixel)"
                        }}
                      />

                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={2}
                        placeholder="Type message or click a preset..."
                        style={{
                          padding: "2px 3px",
                          fontSize: "7px",
                          background: "rgba(0,30,10,0.9)",
                          border: "1px solid rgba(57,255,20,0.4)",
                          color: "#39ff14",
                          outline: "none",
                          resize: "none",
                          fontFamily: "var(--font-pixel)"
                        }}
                      />

                      {/* Quick Presets */}
                      <div style={{ display: "flex", gap: "2px", overflowX: "auto", paddingBottom: "2px" }}>
                        {PRESET_MESSAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              retroAudio.playClick(1.1);
                              setMessage(preset);
                            }}
                            style={{
                              whiteSpace: "nowrap",
                              fontSize: "6px",
                              padding: "1px 3px",
                              background: "rgba(57,255,20,0.1)",
                              border: "1px solid rgba(57,255,20,0.3)",
                              color: "#39ff14",
                              cursor: "pointer"
                            }}
                          >
                            {preset.slice(0, 16)}...
                          </button>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "4px", marginTop: "auto" }}>
                        <button
                          type="submit"
                          style={{
                            flex: 1,
                            padding: "2px",
                            background: "rgba(57,255,20,0.3)",
                            border: "1px solid #39ff14",
                            color: "#39ff14",
                            fontSize: "8px",
                            cursor: "pointer",
                            fontFamily: "var(--font-pixel)",
                            fontWeight: "bold"
                          }}
                        >
                          ▶ SEND SMS
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* CONTACTS SCREEN */}
              {activeScreen === "contacts" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto", padding: "2px 4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                    <span style={{ fontSize: "8px", color: "rgba(57,255,20,0.6)" }}>PHONEBOOK</span>
                    {copiedLabel && (
                      <span style={{ fontSize: "7px", color: "#ffe500", fontWeight: "bold" }}>
                        {copiedLabel} COPIED!
                      </span>
                    )}
                  </div>
                  {[
                    { icon: "🐙", label: "GitHub", value: "shashikiranbs2006", url: contact.github },
                    { icon: "💼", label: "LinkedIn", value: "shashikiran-bs", url: contact.linkedin },
                    { icon: "✉️", label: "Email", value: contact.email, url: `mailto:${contact.email}` },
                    { icon: "📞", label: "Phone", value: contact.phone, url: `tel:${contact.phone}` }
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "2px 4px",
                        background: "rgba(57,255,20,0.1)",
                        border: "1px solid rgba(57,255,20,0.25)",
                        fontSize: "7px",
                        fontFamily: "var(--font-pixel)"
                      }}
                    >
                      <span>{item.icon}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => retroAudio.playClick(1.0)}
                        style={{
                          textDecoration: "none",
                          color: "#39ff14",
                          flex: 1,
                          overflow: "hidden"
                        }}
                      >
                        <div style={{ color: "rgba(57,255,20,0.5)", fontSize: "5px" }}>{item.label}</div>
                        <div style={{ fontSize: "7px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.value}
                        </div>
                      </a>
                      <button
                        type="button"
                        onClick={() => copyContact(item.value, item.label)}
                        title={`Copy ${item.label}`}
                        style={{
                          background: "rgba(57,255,20,0.2)",
                          border: "1px solid rgba(57,255,20,0.4)",
                          color: "#39ff14",
                          fontSize: "6px",
                          padding: "1px 3px",
                          cursor: "pointer"
                        }}
                      >
                        COPY
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      retroAudio.playClick(0.9);
                      setActiveScreen("home");
                    }}
                    style={{
                      padding: "2px",
                      background: "transparent",
                      border: "1px solid rgba(57,255,20,0.3)",
                      color: "rgba(57,255,20,0.7)",
                      fontSize: "7px",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)",
                      marginTop: "auto"
                    }}
                  >
                    ← BACK
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== INTERACTIVE MOTOROLA KEYPAD OVERLAY ===== */}
        {/* Exact grid positioned directly over the real RAZR keypad photo */}
        <div
          style={{
            position: "absolute",
            top: "54%",
            left: "17.5%",
            width: "65%",
            height: "32%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: "3px",
            zIndex: 15
          }}
        >
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => handleKeyPress(k)}
              title={`Key ${k}`}
              style={{
                background: pressedKey === k ? "rgba(0, 200, 255, 0.45)" : "transparent",
                border: "1px solid transparent",
                borderRadius: "3px",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: pressedKey === k ? "#fff" : "transparent",
                fontSize: "10px",
                fontWeight: "bold",
                boxShadow: pressedKey === k ? "0 0 10px rgba(0,200,255,0.8)" : "none",
                transition: "background 0.1s ease"
              }}
            >
              {pressedKey === k && k}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Bottom Help */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-pixel)",
          fontSize: "9px",
          color: "rgba(0, 220, 255, 0.7)",
          letterSpacing: "1px",
          textAlign: "center",
          whiteSpace: "nowrap",
          background: "rgba(0,0,0,0.5)",
          padding: "2px 8px",
          borderRadius: "4px",
          border: "1px solid rgba(0,220,255,0.3)"
        }}
      >
        PRESS KEYBOARD NUMPAD OR CLICK RAZR KEYS · DIAL 2027 OR 911 FOR EASTER EGGS
      </div>
    </div>
  );
};
