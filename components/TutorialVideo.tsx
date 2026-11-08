"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Drop the real file at public/videos/tutorial.mp4 and it plays here.
export default function TutorialVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  return (
    <div className="tv">
      <video
        ref={ref}
        className="tv-video"
        src="/videos/tutorial.mp4"
        playsInline
        controls={playing}
        preload="metadata"
        poster="/videos/tutorial-poster.webp"
        onError={() => setMissing(true)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          className="tv-poster"
          disabled={missing}
          onClick={() => {
            setPlaying(true);
            ref.current?.play().catch(() => setMissing(true));
          }}
          aria-label={missing ? "Tutorial video coming soon" : "Play tutorial video"}
        >
          <Image src="/videos/tutorial-poster.webp" alt="" fill sizes="(min-width: 860px) 50vw, 100vw" unoptimized />
          <span className="tv-play">
            {missing ? (
              "Video coming soon"
            ) : (
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
