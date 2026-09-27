import React, { useState, useRef, useEffect } from "react";
import { retroAudio } from "../../utils/audioSystem";

interface Track {
  title: string;
  artist: string;
  album: string;
  src: string;
}

const PLAYLIST: Track[] = [
  {
    title: "Can't Tell Me Nothing",
    artist: "Kanye West",
    album: "Graduation (Instrumental)",
    src: "/music.mp3"
  }
];

export const MusicPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [eqHeights, setEqHeights] = useState<number[]>([40, 65, 85, 50, 75, 90, 60, 45, 80, 70, 95, 55, 60, 40]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = PLAYLIST[0];

  useEffect(() => {
    const audio = new Audio(track.src);
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [track.src]);

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
    if (!audio) return;
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
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
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
        <div>
          <div style={{ fontSize: "13px", fontWeight: "bold", letterSpacing: "1px", color: "#39ff14" }}>
            {track.title}
          </div>
          <div style={{ fontSize: "11px", color: "#ffe500", marginTop: "2px" }}>
            {track.artist} — {track.album}
          </div>
        </div>

        {/* LED Graphic Equalizer Spectrum */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "26px", padding: "0 6px" }}>
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

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", color: isPlaying ? "#39ff14" : "#888", fontWeight: "bold" }}>
            {isPlaying ? "▶ PLAY" : "⏸ PAUSE"}
          </div>
          <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
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
              style={{ width: "100%", accentColor: "#000080", cursor: "pointer" }}
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
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <button
          type="button"
          className="bevel-button"
          onClick={handleStop}
          title="Stop"
          style={{ width: "42px", height: "30px", fontWeight: "bold" }}
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
          onClick={() => {
            retroAudio.playClick(1.0);
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              setProgress(0);
            }
          }}
          title="Rewind"
          style={{ width: "42px", height: "30px", fontWeight: "bold" }}
        >
          ◀◀
        </button>
      </div>

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
