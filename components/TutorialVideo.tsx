"use client";

import { useEffect, useRef, useState } from "react";

// Tutorial player: plays muted while on screen, tap to pause/play, sound toggle.
export default function TutorialVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) v.pause();
        else if (!userPaused.current) v.play().catch(() => {});
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    const show = () => {
      userPaused.current = false;
      v.scrollIntoView({ behavior: "smooth", block: "center" });
      v.play().catch(() => {});
    };
    window.addEventListener("itflew:show-tutorial", show);
    return () => {
      io.disconnect();
      window.removeEventListener("itflew:show-tutorial", show);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div className="tv">
      <video
        ref={ref}
        className="tv-video"
        src="/videos/tutorial-web.mp4"
        poster="/videos/tutorial-poster.webp"
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        aria-label="Invisible Thread tutorial: the can rises into the hands"
      />
      <button className={`pg-play${paused ? " is-paused" : ""}`} onClick={toggle} aria-label={paused ? "Play video" : "Pause video"}>
        <span className="pg-play-icon" aria-hidden>
          {paused ? (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
          )}
        </span>
      </button>
      <button className="pg-sound" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
        {muted ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 9h4l5-4v14l-5-4H4zM17 9l4 6M21 9l-4 6" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 9h4l5-4v14l-5-4H4zM17 8a5 5 0 0 1 0 8M19.5 5.5a8.5 8.5 0 0 1 0 13" /></svg>
        )}
      </button>
    </div>
  );
}
