"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Inspector from "./Inspector";

// Product photos: 3:4, subject centred, 2x super-resolved (see public/product).
const SHOTS = [
  { src: "/product/reel-angle-v2.webp", alt: "Invisible Thread reel at an angle, clip underneath", w: 1896, h: 2528, bg: "linear-gradient(90deg,#dddddd,#dddddd)" },
  { src: "/product/reel-front-v2.webp", alt: "Invisible Thread reel, front view with clip", w: 1896, h: 2528, bg: "linear-gradient(90deg,#e2e2e2 50%,#eceaea 50%)" },
  { src: "/product/reel-jacket-hd.webp", alt: "Invisible Thread clipped inside a jacket, thread running down the lining", w: 1512, h: 2016, bg: "linear-gradient(90deg,#1f232e 50%,#332a2c 50%)" },
];

// the tutorial clip sits second in the gallery so it's seen right away
const SLIDES: (typeof SHOTS[number] | "video")[] = [SHOTS[0], "video", SHOTS[1], SHOTS[2]];

export default function PdpGallery() {
  const vid = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const rail = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const on = () => setI(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  const go = (d: number) => {
    const el = rail.current;
    if (!el) return;
    const n = (i + d + SLIDES.length) % SLIDES.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="pg">
      <div className="pg-rail" ref={rail}>
        {SLIDES.map((s, k) =>
          s === "video" ? (
            <div key="video" className="pg-slide pg-video">
              <video
                ref={vid}
                src="/videos/tutorial.mp4"
                poster="/videos/tutorial-poster.webp"
                muted={muted}
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="pg-img"
                aria-label="Invisible Thread in action: the can rises into the hands"
              />
              <button className="pg-sound" onClick={() => setMuted((m) => !m)} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
                {muted ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 9h4l5-4v14l-5-4H4zM17 9l4 6M21 9l-4 6" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 9h4l5-4v14l-5-4H4zM17 8a5 5 0 0 1 0 8M19.5 5.5a8.5 8.5 0 0 1 0 13" /></svg>
                )}
              </button>
            </div>
          ) : (
            <div key={s.src} className="pg-slide" style={{ background: s.bg }} role="button" tabIndex={0} onClick={() => setOpen(true)} onKeyDown={(e) => e.key === "Enter" && setOpen(true)} aria-label={`Inspect image ${SHOTS.indexOf(s) + 1}`}>
              <Image src={s.src} alt={s.alt} width={s.w} height={s.h} unoptimized priority={k === 0} className="pg-img" />
            </div>
          )
        )}
      </div>
      <span className="pg-new">New</span>
      <button className="pg-zoom" aria-label="Inspect and zoom" onClick={() => setOpen(true)} hidden={SLIDES[i] === "video"}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6" />
        </svg>
      </button>
      <button className="pg-next" aria-label="Next image" onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M9 4l8 8-8 8" /></svg>
      </button>
      <div className="pg-bar" aria-hidden>
        <span style={{ width: `${100 / SLIDES.length}%`, left: `${(i * 100) / SLIDES.length}%` }} />
      </div>
      {open && <Inspector images={SHOTS} start={Math.max(0, SHOTS.indexOf(SLIDES[i] as typeof SHOTS[number]))} onClose={() => setOpen(false)} />}
    </div>
  );
}
