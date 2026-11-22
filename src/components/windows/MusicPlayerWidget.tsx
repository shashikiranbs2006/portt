import { useEffect, useRef, useState } from "react";
import "./music-player.css";

const formatTime = (value: number) => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;

export function MusicPlayerWidget() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.65);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) { audio.pause(); return; }
    try { await audio.play(); setError(false); } catch { setError(true); }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  return <div className="cd-player">
    <audio ref={audioRef} src="/music.mp3" preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setError(true)} />
    <div className="cd-topline"><span>SHASHI★ OS / AUDIO</span><span>DISC 01</span></div>
    <div className="cd-main">
      <div className={`cd-disc ${playing ? "is-playing" : ""}`} aria-hidden="true"><div className="cd-disc-label">S★<small>01</small></div></div>
      <div className="cd-info"><span className="cd-kicker">NOW PLAYING</span><h2>Can’t Tell Me Nothing</h2><p>Kanye West · Instrumental</p><div className="cd-display"><span>{playing ? "▶ PLAYING" : "Ⅱ PAUSED"}</span><span>{formatTime(currentTime)} / {formatTime(duration)}</span></div></div>
    </div>
    <label className="cd-range-label" htmlFor="cd-seek">TRACK POSITION</label>
    <input id="cd-seek" className="cd-seek" type="range" min="0" max={duration || 1} step="0.1" value={currentTime} onChange={(event) => { const audio = audioRef.current; if (audio) audio.currentTime = Number(event.target.value); }} aria-label="Seek through track" />
    <div className="cd-controls"><button type="button" onClick={stop} aria-label="Stop and rewind">■ <span>STOP</span></button><button type="button" className="cd-play" onClick={toggle}>{playing ? "Ⅱ PAUSE" : "▶ PLAY"}</button><label htmlFor="cd-volume">VOL</label><input id="cd-volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volume" /></div>
    {error && <p className="cd-error">Audio could not play. Try again.</p>}
  </div>;
}
