"use client";

import { useEffect, useRef } from "react";

// Sparse, slow snowfall of small six-armed crystals over the hero.
// Time-based motion (same speed on 60Hz and 120Hz screens), and flakes are kept
// when the mobile address bar resizes the page, so touching/scrolling never makes it jump.

type Flake = {
  x: number; y: number; size: number; vy: number;
  swayAmp: number; swayFreq: number; phase: number;
  rot: number; spin: number; alpha: number; sprite: number;
};

// Draw one crystal into an offscreen canvas (white, crisp, with a faint glow).
function makeSprite(px: number, variant: number) {
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const g = c.getContext("2d")!;
  const r = px / 2;
  g.translate(r, r);
  g.strokeStyle = "#fff";
  g.lineCap = "round";
  g.shadowColor = "rgba(255,255,255,.7)";
  g.shadowBlur = px * 0.06;
  const arm = r * 0.86;
  for (let i = 0; i < 6; i++) {
    g.save();
    g.rotate((i * Math.PI) / 3);
    g.lineWidth = px * 0.045;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(0, -arm);
    g.stroke();
    // branches differ per variant for a mix of crystal shapes
    const branches = variant === 0 ? [0.45, 0.7] : variant === 1 ? [0.38, 0.6, 0.8] : [0.55];
    g.lineWidth = px * 0.035;
    for (const t of branches) {
      const len = arm * (variant === 2 ? 0.34 : 0.24) * (1.15 - t * 0.6);
      g.beginPath();
      g.moveTo(0, -arm * t);
      g.lineTo(-len, -arm * t - len * 0.9);
      g.moveTo(0, -arm * t);
      g.lineTo(len, -arm * t - len * 0.9);
      g.stroke();
    }
    g.restore();
  }
  g.beginPath();
  g.arc(0, 0, px * 0.06, 0, Math.PI * 2);
  g.fillStyle = "#fff";
  g.fill();
  return c;
}

export default function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sprites = [0, 1, 2].map((v) => makeSprite(Math.round(28 * dpr), v));
    let w = 0, h = 0, flakes: Flake[] = [], raf = 0, last = 0, visible = true;

    const spawn = (anyY: boolean): Flake => {
      const depth = Math.random(); // 0 = far, 1 = near
      return {
        x: Math.random() * w,
        y: anyY ? Math.random() * h : -16,
        size: 6 + depth * 7,                 // 6–13px: small and delicate
        vy: 14 + depth * 18,                 // 14–32 px per second: a slow drift
        swayAmp: 6 + Math.random() * 10,
        swayFreq: 0.25 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.5,  // gentle turn
        alpha: 0.45 + depth * 0.45,
        sprite: Math.floor(Math.random() * sprites.length),
      };
    };

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      const widthChanged = Math.round(rect.width) !== Math.round(w);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (widthChanged) {
        const count = Math.round(Math.min(34, Math.max(14, (w * h) / 16000)));
        flakes = Array.from({ length: count }, () => spawn(true));
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0); // seconds, clamped after tab switches
      last = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.vy * dt;
        f.rot += f.spin * dt;
        if (f.y > h + 16) Object.assign(f, spawn(false));
        const x = f.x + Math.sin(t * f.swayFreq * Math.PI * 2 + f.phase) * f.swayAmp;
        ctx.globalAlpha = f.alpha;
        ctx.save();
        ctx.translate(x, f.y);
        ctx.rotate(f.rot);
        ctx.drawImage(sprites[f.sprite], -f.size / 2, -f.size / 2, f.size, f.size);
        ctx.restore();
      }
      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      last = 0;
      if (visible) raf = requestAnimationFrame(frame);
    });
    const ro = new ResizeObserver(size);

    size();
    ro.observe(canvas);
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="snow" aria-hidden />;
}
