import Image from "next/image";

// Retro magic-poster sunburst behind the cut-out hand. Pure SVG so it stays crisp.
const RAYS = 56;
const CX = 300;
const CY = 330; // burst centre sits just above the pod
const R = 1200;

const COLORS = ["#b22423", "#ffffff", "#1b1f6b", "#ffffff"];

function rays() {
  const step = (Math.PI * 2) / RAYS;
  return Array.from({ length: RAYS }, (_, i) => {
    const a0 = i * step - Math.PI / 2;
    const a1 = a0 + step;
    const p = (a: number) => `${(CX + R * Math.cos(a)).toFixed(1)},${(CY + R * Math.sin(a)).toFixed(1)}`;
    return <polygon key={i} points={`${CX},${CY} ${p(a0)} ${p(a1)}`} fill={COLORS[i % 4]} />;
  });
}

function Star({ x, y }: { x: number; y: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 ? 9 : 22;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <g>
      <circle cx={x} cy={y} r="40" fill="#1b1f6b" />
      <polygon points={pts} fill="#b22423" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  );
}

export default function Poster({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  return (
    <div className={`poster ${className}`}>
      <svg className="poster-bg" viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="glow" cx={CX / 600} cy={CY / 750} r="0.55">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset=".35" stopColor="#ffffff" stopOpacity=".35" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="wear" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="11" />
            <feColorMatrix values="0 0 0 0 0.97  0 0 0 0 0.92  0 0 0 0 0.79  0 0 0 22 -14.6" />
          </filter>
        </defs>
        <g className="poster-rays">{rays()}</g>
        <rect width="600" height="750" fill="url(#glow)" />
        <rect width="600" height="750" filter="url(#wear)" opacity="0" />
      </svg>
      <Image
        className="poster-hand"
        src="/itr-hand.webp"
        alt="A red-gloved hand holding the Levitation Pod"
        width={412}
        height={947}
        priority={priority}
        unoptimized
      />
      {/* navy frame with corner stars (CSS, so it stays crisp at any card shape) */}
      <div className="poster-frame" aria-hidden>
        {["tl", "tr", "bl", "br"].map((c) => (
          <svg key={c} className={`poster-star ${c}`} viewBox="-40 -40 80 80">
            <Star x={0} y={0} />
          </svg>
        ))}
      </div>
    </div>
  );
}
