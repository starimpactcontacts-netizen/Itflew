"use client";

import { useEffect, useRef } from "react";

// Soft snowfall over the hero. Canvas, capped at 60fps, pauses off-screen and for reduced motion.
export default function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    type Flake = { x: number; y: number; r: number; vy: number; drift: number; phase: number; a: number };
    let w = 0, h = 0, flakes: Flake[] = [], raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const make = (anyY: boolean): Flake => {
      const depth = Math.random(); // 0 far, 1 near
      return {
        x: Math.random() * w,
        y: anyY ? Math.random() * h : -10,
        r: 0.8 + depth * 2.4,
        vy: 0.25 + depth * 0.75,
        drift: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        a: 0.35 + depth * 0.55,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, (w * h) / 4500));
      flakes = Array.from({ length: count }, () => make(true));
    };

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      for (const f of flakes) {
        f.y += f.vy;
        f.x += Math.sin(t * f.drift + f.phase) * 0.35;
        if (f.y > h + 10) Object.assign(f, make(false));
        ctx.globalAlpha = f.a;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="snow" aria-hidden />;
}
