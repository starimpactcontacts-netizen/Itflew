"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Inspector from "./Inspector";

// Product photos: 3:4, subject centred, 2x super-resolved (see public/product).
const SHOTS = [
  { src: "/product/reel-angle-v2.webp", alt: "Levitation Pod at an angle, clip underneath", w: 1896, h: 2528, bg: "linear-gradient(90deg,#dddddd,#dddddd)" },
  { src: "/product/reel-front-v2.webp", alt: "Levitation Pod, front view with clip", w: 1896, h: 2528, bg: "linear-gradient(90deg,#e2e2e2 50%,#eceaea 50%)" },
  { src: "/product/reel-jacket-v2.webp", alt: "Levitation Pod clipped inside a jacket, thread running down the lining", w: 1792, h: 2390, bg: "linear-gradient(90deg,#1b1d2c 50%,#131217 50%)" },
];

// the tutorial clip sits second in the gallery so it's seen right away
const SLIDES: (typeof SHOTS[number] | "video")[] = [SHOTS[0], "video", SHOTS[1], SHOTS[2]];

export default function PdpGallery() {
  const vid = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);
  const rail = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const on = () => setI(Math.round(el.scrollLeft / el.clientWidth));
    // deep link from the home page cards, e.g. ?view=jacket
    const view = new URLSearchParams(window.location.search).get("view");
    const target = view === "jacket" ? SLIDES.indexOf(SHOTS[2]) : view === "video" ? SLIDES.indexOf("video") : -1;
    if (target > 0) requestAnimationFrame(() => { el.scrollTo({ left: target * el.clientWidth }); setI(target); });
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const show = () => {
      const el = rail.current;
      if (!el) return;
      window.scrollTo({ top: 0, behavior: "smooth" });
      const k = SLIDES.indexOf("video");
      el.scrollTo({ left: k * el.clientWidth, behavior: "smooth" });
      setI(k);
      userPaused.current = false;
      vid.current?.play().catch(() => {});
    };
    window.addEventListener("itflew:show-video", show);
    return () => window.removeEventListener("itflew:show-video", show);
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (SLIDES[i] !== "video") v.pause();
    else if (!userPaused.current) v.play().catch(() => {});
  }, [i]);

  // don't keep decoding the clip once the gallery is scrolled off screen
  useEffect(() => {
    const v = vid.current;
    const box = rail.current;
    if (!v || !box) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (SLIDES[Math.round(box.scrollLeft / box.clientWidth)] === "video" && !userPaused.current) v.play().catch(() => {});
    }, { threshold: 0.25 });
    io.observe(box);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

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
                src="/videos/tutorial-web.mp4"
                poster="/videos/tutorial-poster.webp"
                muted={muted}
                loop
                playsInline
                autoPlay
                preload="auto"
                className="pg-img"
                onPlay={() => setPaused(false)}
                onPause={() => setPaused(true)}
                aria-label="Levitation Pod in action: the can rises into the hands"
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
