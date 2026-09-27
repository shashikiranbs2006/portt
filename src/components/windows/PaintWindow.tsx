import React, { useRef, useState, useEffect } from "react";

const PAINT_COLORS = [
  "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080",
  "#808040", "#004040", "#0080ff", "#004080", "#8000ff", "#804000", "#ffffff", "#c0c0c0",
  "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ffff80", "#00ff80",
  "#80ffff", "#8080ff", "#ff0080", "#ff8040"
];

export const PaintWindow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [activeTool, setActiveTool] = useState<"pencil" | "brush" | "eraser" | "spray">("brush");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initial welcome sketch / retro doodle
    ctx.strokeStyle = "#ff3b30";
    ctx.lineWidth = 3;
    ctx.font = "bold 16px 'VT323', monospace";
    ctx.fillStyle = "#000080";
    ctx.fillText("🎨 WELCOME TO MS PAINT 2000!", 20, 30);
    ctx.fillStyle = "#666";
    ctx.font = "14px 'VT323', monospace";
    ctx.fillText("Draw a doodle or stamp your signature here! ★", 20, 50);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (activeTool === "spray") {
      drawSpray(ctx, x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMousePos({ x, y });

    if (!isDrawing) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (activeTool === "eraser") {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = brushSize * 3;
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
    const density = 20;
    for (let i = 0; i < density; i++) {
      const offsetX = (Math.random() - 0.5) * brushSize * 4;
      const offsetY = (Math.random() - 0.5) * brushSize * 4;
      ctx.fillRect(x + offsetX, y + offsetY, 1.5, 1.5);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "shashi_os_paint.png";
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
        fontFamily: "var(--font-pixel)"
      }}
    >
      {/* Menu Bar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "2px 6px",
          borderBottom: "1px solid #808080",
          fontSize: "12px"
        }}
      >
        <span><u>F</u>ile</span>
        <span><u>E</u>dit</span>
        <span><u>V</u>iew</span>
        <span><u>I</u>mage</span>
        <span><u>O</u>ptions</span>
        <span><u>H</u>elp</span>
      </div>

      {/* Main Workspace: Left Tool Palette + Canvas */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", padding: "4px", gap: "6px" }}>
        {/* Left 16-tool Palette */}
        <div
          className="bevel-raised"
          style={{
            width: "60px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
            padding: "3px",
            alignContent: "start",
            backgroundColor: "#c0c0c0"
          }}
        >
          <button
            type="button"
            className={`win-btn ${activeTool === "pencil" ? "active" : ""}`}
            style={{ width: "24px", height: "24px" }}
            onClick={() => setActiveTool("pencil")}
            title="Pencil"
          >
            ✏️
          </button>
          <button
            type="button"
            className={`win-btn ${activeTool === "brush" ? "active" : ""}`}
            style={{ width: "24px", height: "24px" }}
            onClick={() => setActiveTool("brush")}
            title="Brush"
          >
            🖌️
          </button>
          <button
            type="button"
            className={`win-btn ${activeTool === "spray" ? "active" : ""}`}
            style={{ width: "24px", height: "24px" }}
            onClick={() => setActiveTool("spray")}
            title="Airbrush"
          >
            💨
          </button>
          <button
            type="button"
            className={`win-btn ${activeTool === "eraser" ? "active" : ""}`}
            style={{ width: "24px", height: "24px" }}
            onClick={() => setActiveTool("eraser")}
            title="Eraser"
          >
            🧼
          </button>

          {/* Size picker */}
          <div
            style={{
              gridColumn: "span 2",
              marginTop: "8px",
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
                onClick={() => setBrushSize(size)}
                style={{
                  height: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: brushSize === size ? "#000080" : "transparent"
                }}
              >
                <div
                  style={{
                    width: `${size * 2}px`,
                    height: `${size}px`,
                    backgroundColor: brushSize === size ? "#fff" : "#000"
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Drawing Canvas */}
        <div
          className="bevel-sunken"
          style={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "#808080",
            display: "flex",
            padding: "8px"
          }}
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={380}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
              backgroundColor: "#ffffff",
              cursor: "crosshair",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      </div>

      {/* Bottom Swatch Color Bar */}
      <div
        className="bevel-raised"
        style={{
          padding: "4px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#c0c0c0",
          borderTop: "1px solid #808080"
        }}
      >
        {/* Active Color Preview */}
        <div
          className="bevel-sunken"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: currentColor
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
            flex: 1
          }}
        >
          {PAINT_COLORS.map((c, i) => (
            <div
              key={i}
              onClick={() => setCurrentColor(c)}
              style={{
                width: "16px",
                height: "14px",
                backgroundColor: c,
                cursor: "pointer",
                boxShadow: "inset 1px 1px #fff, inset -1px -1px #000"
              }}
              title={c}
            />
          ))}
        </div>

        {/* Action Buttons: Clear & Download */}
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            type="button"
            className="bevel-button"
            onClick={clearCanvas}
            style={{ fontSize: "11px", padding: "2px 6px" }}
          >
            Clear
          </button>
          <button
            type="button"
            className="bevel-button"
            onClick={downloadArt}
            style={{ fontSize: "11px", padding: "2px 6px", fontWeight: "bold" }}
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
          color: "#444"
        }}
      >
        <span>Ready</span>
        <span>
          {mousePos.x}, {mousePos.y}px
        </span>
      </div>
    </div>
  );
};
