import React, { useRef, useState, useEffect } from "react";
import { retroAudio } from "../../utils/audioSystem";

const PAINT_COLORS = [
  "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080",
  "#808040", "#004040", "#0080ff", "#004080", "#8000ff", "#804000", "#ffffff", "#c0c0c0",
  "#ff3b30", "#ffe500", "#39ff14", "#00ffff", "#0000ff", "#ff00ff", "#ffff80", "#00ff80",
  "#80ffff", "#8080ff", "#ff0080", "#ff8040"
];

const RISO_STAMPS = [
  { id: "star", label: "★ STAR", icon: "★" },
  { id: "approved", label: "[APPROVED]", icon: "✅" },
  { id: "nirmaan", label: "[NIRMAAN 2026]", icon: "🏷️" },
  { id: "shashi", label: "[SHASHI★]", icon: "⚡" },
  { id: "gig", label: "[LIVE GIG]", icon: "🎸" }
];

export const PaintWindow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [activeTool, setActiveTool] = useState<"pencil" | "brush" | "eraser" | "spray" | "stamp">("brush");
  const [selectedStamp, setSelectedStamp] = useState<string>("star");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initial welcome sketch / gig-poster doodle
    ctx.strokeStyle = "#ff3b30";
    ctx.lineWidth = 3;
    ctx.font = "bold 16px 'VT323', monospace";
    ctx.fillStyle = "#000080";
    ctx.fillText("🎨 MS PAINT // RISO STAMP STUDIO", 20, 30);
    ctx.fillStyle = "#666";
    ctx.font = "14px 'VT323', monospace";
    ctx.fillText("Draw, spray paint, or stamp gig-poster badges! ★", 20, 52);

    // Initial stamp demo
    renderStamp(ctx, 480, 50, "star", "#ff3b30");
    renderStamp(ctx, 450, 110, "shashi", "#000080");
  }, []);

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY)
    };
  };

  const renderStamp = (ctx: CanvasRenderingContext2D, x: number, y: number, stampId: string, color: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.15); // subtle riso print misregistration angle

    if (stampId === "star") {
      ctx.fillStyle = color;
      ctx.font = "bold 38px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("★", 0, 0);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000";
      ctx.strokeText("★", 0, 0);
    } else if (stampId === "approved") {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(-65, -16, 130, 32);
      ctx.fillStyle = color;
      ctx.font = "bold 14px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("APPROVED // 2026", 0, 0);
    } else if (stampId === "nirmaan") {
      ctx.fillStyle = color;
      ctx.fillRect(-70, -15, 140, 30);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NIRMAAN 2026 ★", 0, 0);
    } else if (stampId === "shashi") {
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(-55, -14, 110, 28);
      ctx.fillStyle = color;
      ctx.font = "bold 13px 'Silkscreen', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SHASHI★ OS", 0, 0);
    } else if (stampId === "gig") {
      ctx.fillStyle = color;
      ctx.font = "bold 14px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🎸 LIVE IN PROD", 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(-60, -15, 120, 30);
    }
    ctx.restore();
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getCanvasCoords(clientX, clientY);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (activeTool === "stamp") {
      retroAudio.playPeel();
      renderStamp(ctx, x, y, selectedStamp, currentColor);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeTool === "spray") {
      drawSpray(ctx, x, y);
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = getCanvasCoords(clientX, clientY);
    setMousePos({ x, y });

    if (!isDrawing) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (activeTool === "eraser") {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = brushSize * 4;
      ctx.lineCap = "square";
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (activeTool === "pencil") {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 1;
      ctx.lineCap = "square";
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (activeTool === "brush") {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (activeTool === "spray") {
      drawSpray(ctx, x, y);
    }
  };

  const drawSpray = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = currentColor;
    const density = 22;
    for (let i = 0; i < density; i++) {
      const offsetX = (Math.random() - 0.5) * brushSize * 5;
      const offsetY = (Math.random() - 0.5) * brushSize * 5;
      ctx.fillRect(x + offsetX, y + offsetY, 1.5, 1.5);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    retroAudio.playDriveRead();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadArt = () => {
    retroAudio.playClick(1.2);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "shashi_riso_art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#c0c0c0",
        fontFamily: "var(--font-pixel)",
        userSelect: "none"
      }}
    >
      {/* Menu Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "3px 8px",
          borderBottom: "1px solid #808080",
          fontSize: "12px",
          backgroundColor: "#f0f0f0"
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          <span><u>F</u>ile</span>
          <span><u>E</u>dit</span>
          <span><u>V</u>iew</span>
          <span><u>I</u>mage</span>
          <span><u>H</u>elp</span>
        </div>
        <span style={{ color: "#d91e18", fontWeight: "bold", fontSize: "11px" }}>
          RISO STAMP STUDIO v2.0
        </span>
      </div>

      {/* Main Workspace: Left Tool Palette + Canvas */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", padding: "4px", gap: "6px" }}>
        {/* Left Tool Palette */}
        <div
          className="bevel-raised"
          style={{
            width: "66px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "4px",
            backgroundColor: "#c0c0c0",
            flexShrink: 0
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px"
            }}
          >
            <button
              type="button"
              className={`win-btn ${activeTool === "pencil" ? "active" : ""}`}
              style={{ width: "26px", height: "26px" }}
              onClick={() => {
                retroAudio.playClick(1.0);
                setActiveTool("pencil");
              }}
              title="Pencil"
            >
              ✏️
            </button>
            <button
              type="button"
              className={`win-btn ${activeTool === "brush" ? "active" : ""}`}
              style={{ width: "26px", height: "26px" }}
              onClick={() => {
                retroAudio.playClick(1.0);
                setActiveTool("brush");
              }}
              title="Brush"
            >
              🖌️
            </button>
            <button
              type="button"
              className={`win-btn ${activeTool === "spray" ? "active" : ""}`}
              style={{ width: "26px", height: "26px" }}
              onClick={() => {
                retroAudio.playClick(1.0);
                setActiveTool("spray");
              }}
              title="Airbrush"
            >
              💨
            </button>
            <button
              type="button"
              className={`win-btn ${activeTool === "eraser" ? "active" : ""}`}
              style={{ width: "26px", height: "26px" }}
              onClick={() => {
                retroAudio.playClick(1.0);
                setActiveTool("eraser");
              }}
              title="Eraser"
            >
              🧼
            </button>
            <button
              type="button"
              className={`win-btn ${activeTool === "stamp" ? "active" : ""}`}
              style={{ width: "26px", height: "26px", gridColumn: "span 2", backgroundColor: activeTool === "stamp" ? "#ffe500" : "#c0c0c0" }}
              onClick={() => {
                retroAudio.playClick(1.2);
                setActiveTool("stamp");
              }}
              title="Riso Rubber Stamp"
            >
              🏷️ STAMP
            </button>
          </div>

          {/* Stamp selector if stamp tool active */}
          {activeTool === "stamp" && (
            <div
              className="bevel-sunken"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                padding: "3px",
                backgroundColor: "#fffde7"
              }}
            >
              <span style={{ fontSize: "9px", fontWeight: "bold", color: "#d91e18" }}>BADGE:</span>
              {RISO_STAMPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    retroAudio.playClick(1.1);
                    setSelectedStamp(s.id);
                  }}
                  style={{
                    fontSize: "8px",
                    padding: "2px",
                    background: selectedStamp === s.id ? "#000080" : "transparent",
                    color: selectedStamp === s.id ? "#fff" : "#000",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "var(--font-pixel)"
                  }}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Size picker */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "4px 2px",
              backgroundColor: "#dfdfdf"
            }}
            className="bevel-sunken"
          >
            {[2, 4, 8].map((size) => (
              <div
                key={size}
                onClick={() => {
                  retroAudio.playClick(0.95);
                  setBrushSize(size);
                }}
                style={{
                  height: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: brushSize === size ? "#000080" : "transparent"
                }}
              >
                <div
                  style={{
                    width: `${size * 2.5}px`,
                    height: `${size}px`,
                    backgroundColor: brushSize === size ? "#fff" : "#000"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Drawing Canvas (with touch-action: none for full touch device support) */}
        <div
          className="bevel-sunken"
          style={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "#7f7f7f",
            display: "flex",
            padding: "8px"
          }}
        >
          <canvas
            ref={canvasRef}
            width={620}
            height={390}
            onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchMove={(e) => {
              if (e.touches.length > 0) {
                handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            onTouchEnd={handlePointerUp}
            style={{
              backgroundColor: "#ffffff",
              cursor: activeTool === "stamp" ? "pointer" : "crosshair",
              boxShadow: "3px 3px 8px rgba(0,0,0,0.6)",
              touchAction: "none"
            }}
          />
        </div>
      </div>

      {/* Bottom Swatch Color Bar */}
      <div
        className="bevel-raised"
        style={{
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080",
          flexWrap: "wrap"
        }}
      >
        {/* Active Color Preview */}
        <div
          className="bevel-sunken"
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: currentColor,
            boxShadow: "inset 1px 1px 2px #000"
          }}
          title={`Active Color: ${currentColor}`}
        />

        {/* 28-color Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridAutoFlow: "column",
            gap: "2px",
            flex: 1,
            maxWidth: "340px"
          }}
        >
          {PAINT_COLORS.map((c, i) => (
            <div
              key={i}
              onClick={() => {
                retroAudio.playClick(1.0);
                setCurrentColor(c);
              }}
              style={{
                width: "16px",
                height: "14px",
                backgroundColor: c,
                cursor: "pointer",
                boxShadow: currentColor === c ? "0 0 0 1px #000, inset 0 0 0 1px #fff" : "inset 1px 1px #fff, inset -1px -1px #000"
              }}
              title={c}
            />
          ))}
        </div>

        {/* Action Buttons: Clear & Download */}
        <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
          <button
            type="button"
            className="bevel-button"
            onClick={clearCanvas}
            style={{ fontSize: "11px", padding: "3px 8px" }}
          >
            🗑 Clear
          </button>
          <button
            type="button"
            className="bevel-button"
            onClick={downloadArt}
            style={{
              fontSize: "11px",
              padding: "3px 10px",
              fontWeight: "bold",
              backgroundColor: "#ffe500",
              color: "#000"
            }}
          >
            💾 Save PNG
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="bevel-raised"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px 8px",
          fontSize: "11px",
          color: "#222"
        }}
      >
        <span>Tool: {activeTool.toUpperCase()} {activeTool === "stamp" ? `(${selectedStamp})` : ""}</span>
        <span>
          {mousePos.x}, {mousePos.y}px
        </span>
      </div>
    </div>
  );
};
