import React, { useState, useRef, useEffect } from "react";
import { retroAudio } from "../../utils/audioSystem";
import { portfolioData } from "../../data/portfolioData";

// Build unified playlist from portfolioData + actual playable src
const PLAYLIST = portfolioData.musicPlaylist.map((track, i) => ({
  ...track,
  // Only the first track has a real mp3 — rest simulate with silence
  src: i === 0 ? "/music.mp3" : null
}));

export const MusicPlayerWidget: React.FC = () => {
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [eqHeights, setEqHeights] = useState<number[]>([40, 65, 85, 50, 75, 90, 60, 45, 80, 70, 95, 55, 60, 40]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = PLAYLIST[trackIdx];

  // Rebuild audio element when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    if (!track.src) {
      // No real audio for this track — reset display
      setIsPlaying(false);
      setDuration(0);
      setCurrentTime(0);
      setProgress(0);
      audioRef.current = null;
      return;
    }
    const audio = new Audio(track.src);
    audio.volume = volume;
    audio.loop = false;
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    });
    audio.addEventListener("ended", () => {
      // Auto-advance to next track
      setTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [trackIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Rhythmic equalizer pulse animation while playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setEqHeights(
        Array.from({ length: 14 }, () => Math.floor(25 + Math.random() * 70))
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = async () => {
    retroAudio.playClick(1.2);
    const audio = audioRef.current;
    if (!audio) {
      // Track has no real audio — play a procedural sound as demo
      retroAudio.playWindowSwoosh(true);
      setIsPlaying((p) => !p);
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay policy fallback
      }
    }
  };

  const handleStop = () => {
    retroAudio.playClick(0.9);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    retroAudio.playClick(1.0);
    handleStop();
    setTrackIdx((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleNext = () => {
    retroAudio.playClick(1.0);
    handleStop();
    setTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const val = parseFloat(e.target.value);
    audio.currentTime = (val / 100) * duration;
    setProgress(val);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "10px",
        backgroundColor: "#c0c0c0",
        fontFamily: "var(--font-pixel)",
        height: "100%",
        userSelect: "none"
      }}
      className="bevel-sunken"
    >
      {/* LCD Display */}
      <div
        className="bevel-sunken"
        style={{
          backgroundColor: "#05080c",
          color: "#39ff14",
          padding: "8px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)"
        }}
      >
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{
            fontSize: "13px", fontWeight: "bold", letterSpacing: "1px", color: "#39ff14",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
          }}>
            {track.title}
          </div>
          <div style={{ fontSize: "11px", color: "#ffe500", marginTop: "2px", whiteSpace: "nowrap" }}>
            {track.artist} — {track.album}
          </div>
          <div style={{ fontSize: "10px", color: "#888", marginTop: "1px" }}>
            TRACK {trackIdx + 1} / {PLAYLIST.length}
            {!track.src && <span style={{ color: "#ff5c5c", marginLeft: "6px" }}>[ DEMO MODE ]</span>}
          </div>
        </div>

        {/* LED Graphic Equalizer Spectrum */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "26px", padding: "0 6px", flexShrink: 0 }}>
          {eqHeights.map((h, i) => (
            <div
              key={i}
              style={{
                width: "4px",
                height: isPlaying ? `${h}%` : "15%",
                backgroundColor: h > 75 ? "#ff3b30" : h > 50 ? "#ffe500" : "#39ff14",
                boxShadow: isPlaying ? "0 0 4px currentColor" : "none",
                transition: "height 0.1s ease"
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "8px" }}>
          <div style={{ fontSize: "14px", color: isPlaying ? "#39ff14" : "#888", fontWeight: "bold" }}>
            {isPlaying ? "▶ PLAY" : "⏸ STOP"}
          </div>
          <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>
            {track.src ? `${formatTime(currentTime)} / ${formatTime(duration)}` : track.duration}
          </div>
        </div>
      </div>

      {/* CD + Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "4px 0" }}>
        {/* Spinning Vinyl CD */}
        <div
          style={{
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            flexShrink: 0,
            background: `
              radial-gradient(circle at 50% 50%, #c0c0c0 0%, transparent 15%),
              conic-gradient(
                #ff007f, #ff6b00, #ffe500, #00e5ff, #7b2fff, #ff007f
              )
            `,
            boxShadow: "0 4px 14px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.2)",
            border: "2px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: isPlaying ? "spin-cd 2s linear infinite" : "none",
            position: "relative"
          }}
        >
          {/* Center hole */}
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#c0c0c0",
              border: "2px solid #999",
              zIndex: 1,
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)"
            }}
          />
          {/* Holographic shimmer ring */}
          <div
            style={{
              position: "absolute",
              inset: "4px",
              borderRadius: "50%",
              background: "conic-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0), rgba(255,255,255,0.3))",
              mixBlendMode: "screen",
              animation: isPlaying ? "spin-cd-reverse 3s linear infinite" : "none"
            }}
          />
        </div>

        {/* Progress & Volume */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "2px" }}>
              <span>SEEK</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              disabled={!track.src}
              style={{ width: "100%", accentColor: "#000080", cursor: track.src ? "pointer" : "default" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
            <span>VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: "#000080", cursor: "pointer" }}
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Transport Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
        <button
          type="button"
          className="bevel-button"
          onClick={handlePrev}
          title="Previous Track"
          style={{ width: "36px", height: "30px", fontWeight: "bold", fontSize: "12px" }}
        >
          ◀◀
        </button>
        <button
          type="button"
          className="bevel-button"
          onClick={handleStop}
          title="Stop"
          style={{ width: "36px", height: "30px", fontWeight: "bold" }}
        >
          ■
        </button>
        <button
          type="button"
          className={`bevel-button ${isPlaying ? "active" : ""}`}
          onClick={togglePlay}
          title={isPlaying ? "Pause" : "Play"}
          style={{ width: "70px", height: "30px", backgroundColor: "#ffe500", fontWeight: "bold" }}
        >
          {isPlaying ? "❚❚" : "▶ PLAY"}
        </button>
        <button
          type="button"
          className="bevel-button"
          onClick={handleNext}
          title="Next Track"
          style={{ width: "36px", height: "30px", fontWeight: "bold", fontSize: "12px" }}
        >
          ▶▶
        </button>
        <button
          type="button"
          className={`bevel-button ${showPlaylist ? "active" : ""}`}
          onClick={() => { retroAudio.playClick(0.9); setShowPlaylist(p => !p); }}
          title="Toggle Playlist"
          style={{ width: "36px", height: "30px", fontWeight: "bold", fontSize: "11px" }}
        >
          ≡
        </button>
      </div>

      {/* Playlist Panel */}
      {showPlaylist && (
        <div className="bevel-sunken" style={{
          backgroundColor: "#05080c",
          padding: "6px",
          display: "flex",
          flexDirection: "column",
          gap: "3px"
        }}>
          {PLAYLIST.map((t, i) => (
            <div
              key={t.id}
              onClick={() => {
                retroAudio.playClick(1.0);
                handleStop();
                setTrackIdx(i);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "3px 6px",
                cursor: "pointer",
                backgroundColor: i === trackIdx ? "rgba(255,229,0,0.15)" : "transparent",
                borderLeft: i === trackIdx ? "2px solid #ffe500" : "2px solid transparent",
                color: i === trackIdx ? "#ffe500" : "#888",
                fontSize: "11px",
                fontFamily: "var(--font-pixel)",
                transition: "background 0.1s"
              }}
            >
              <span style={{ fontSize: "9px", minWidth: "14px", color: "#555" }}>{i + 1}.</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {t.title}
              </span>
              <span style={{ color: "#555", fontSize: "10px" }}>{t.duration}</span>
              {!t.src && <span style={{ color: "#ff5c5c", fontSize: "9px" }}>DEMO</span>}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin-cd {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-cd-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};
