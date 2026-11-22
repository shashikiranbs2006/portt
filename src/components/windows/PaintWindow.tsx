import { useEffect, useRef, useState } from "react";
import { Brush, Download, Eraser, Paintbrush, Redo2, RotateCcw, SprayCan, Stamp, Undo2 } from "lucide-react";
import "./paint-window.css";

type Tool = "pencil" | "brush" | "spray" | "eraser" | "stamp";
const WIDTH = 900;
const HEIGHT = 560;
const colors = ["#162b45", "#ffffff", "#f4d442", "#e45642", "#ed8a54", "#e89abc", "#7cb7a2", "#53a5c4", "#5485bb", "#795d9f", "#82482f", "#8a9aa4"];
const tools: { id: Tool; name: string; icon: typeof Brush }[] = [
  { id: "pencil", name: "Pencil", icon: Paintbrush },
  { id: "brush", name: "Brush", icon: Brush },
  { id: "spray", name: "Spray", icon: SprayCan },
  { id: "eraser", name: "Eraser", icon: Eraser },
  { id: "stamp", name: "Stamp", icon: Stamp },
];
const stamps = ["★", "✦", "✓", "SHASHI★", "BUILD / SHIP"];

function stampAt(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.08);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = text.length > 2 ? "900 27px Arial" : "900 76px Arial";
  ctx.fillText(text, 0, 0);
  if (text.length > 2) ctx.strokeRect(-ctx.measureText(text).width / 2 - 12, -25, ctx.measureText(text).width + 24, 50);
  ctx.restore();
}

export function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const snapshots = useRef<string[]>([]);
  const [historyPos, setHistoryPos] = useState(0);
  const [historyCount, setHistoryCount] = useState(1);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(8);
  const [stamp, setStamp] = useState(stamps[0]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    snapshots.current = [canvas.toDataURL("image/png")];
  }, []);

  const commit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    snapshots.current = [...snapshots.current.slice(0, historyPos + 1), canvas.toDataURL("image/png")].slice(-20);
    setHistoryPos(snapshots.current.length - 1);
    setHistoryCount(snapshots.current.length);
  };

  const restore = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const snapshot = snapshots.current[index];
    if (!canvas || !ctx || !snapshot) return;
    const image = new Image();
    image.onload = () => { ctx.clearRect(0, 0, WIDTH, HEIGHT); ctx.drawImage(image, 0, 0); };
    image.src = snapshot;
    setHistoryPos(index);
  };

  const coords = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * WIDTH / rect.width, y: (event.clientY - rect.top) * HEIGHT / rect.height };
  };

  const spray = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = color;
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * size * 2.8;
      ctx.fillRect(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, 2, 2);
    }
  };

  const pointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = event.currentTarget.getContext("2d");
    if (!ctx) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const { x, y } = coords(event);
    setPosition({ x: Math.round(x), y: Math.round(y) });
    if (tool === "stamp") { stampAt(ctx, x, y, stamp, color); commit(); return; }
    drawing.current = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "pencil" ? 2 : tool === "eraser" ? size * 3 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === "spray") spray(ctx, x, y);
    else { ctx.lineTo(x + 0.1, y + 0.1); ctx.stroke(); }
  };

  const pointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = coords(event);
    setPosition({ x: Math.round(x), y: Math.round(y) });
    if (!drawing.current) return;
    const ctx = event.currentTarget.getContext("2d");
    if (!ctx) return;
    if (tool === "spray") spray(ctx, x, y);
    else { ctx.lineTo(x, y); ctx.stroke(); }
  };

  const pointerUp = () => { if (drawing.current) { drawing.current = false; commit(); } };
  const clear = () => { const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return; ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, WIDTH, HEIGHT); commit(); };
  const download = () => { const canvas = canvasRef.current; if (!canvas) return; const link = document.createElement("a"); link.href = canvas.toDataURL("image/png"); link.download = "shashi-paint.png"; link.click(); };

  return <div className="paint-app">
    <div className="paint-header"><div><span>SHASHI★ OS / CREATIVE TOOLS</span><h1>PAINT<span>★</span></h1></div><p>Draw something. Make it yours.</p></div>
    <div className="paint-toolbar"><div className="paint-tools" aria-label="Drawing tools">{tools.map((item) => <button key={item.id} type="button" className={tool === item.id ? "selected" : ""} aria-pressed={tool === item.id} onClick={() => setTool(item.id)} title={item.name}><item.icon size={18} /><span>{item.name}</span></button>)}</div><div className="paint-actions"><button type="button" onClick={() => restore(historyPos - 1)} disabled={historyPos <= 0} title="Undo"><Undo2 size={17} /> Undo</button><button type="button" onClick={() => restore(historyPos + 1)} disabled={historyPos >= historyCount - 1} title="Redo"><Redo2 size={17} /> Redo</button><button type="button" onClick={clear} title="Clear canvas"><RotateCcw size={17} /> Clear</button></div></div>
    <div className="paint-workspace"><div className="paint-canvas-wrap"><canvas ref={canvasRef} width={WIDTH} height={HEIGHT} aria-label="Drawing canvas" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} /></div></div>
    <div className="paint-bottom"><div className="paint-colors" aria-label="Paint colors">{colors.map((swatch) => <button key={swatch} type="button" className={color === swatch ? "selected" : ""} style={{ backgroundColor: swatch }} onClick={() => setColor(swatch)} aria-label={`Select ${swatch}`} aria-pressed={color === swatch} />)}<label className="paint-custom-color" title="Custom color"><input type="color" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Custom color" />+</label></div><div className="paint-options">{tool === "stamp" ? <label>STAMP <select value={stamp} onChange={(event) => setStamp(event.target.value)}>{stamps.map((item) => <option key={item} value={item}>{item}</option>)}</select></label> : <label>SIZE <input type="range" min="2" max="32" value={size} onChange={(event) => setSize(Number(event.target.value))} /> {size}px</label>}<button type="button" className="paint-save" onClick={download}><Download size={16} /> Save PNG</button></div></div>
    <div className="paint-status"><span>{tool.toUpperCase()} · {WIDTH} × {HEIGHT} PX</span><span>{position.x}, {position.y}</span></div>
  </div>;
}
