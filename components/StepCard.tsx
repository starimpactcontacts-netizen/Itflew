// Step cards for the tutorial carousel, built from the real product art
// with the thread drawn on top in brand red so the "invisible" part reads.
const RED = "#b22423";
const INK = "#000";
const W = 300;
const H = 400;
const WIN = { x: 22, y: 98, w: 256, h: 246 };

function Card({ n, title, caption, children, id }: { n: string; title: string; caption: string; children: React.ReactNode; id: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="step-svg" role="img" aria-label={`Step ${n}: ${title}. ${caption}`}>
      <defs>
        <clipPath id={`win-${id}`}>
          <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} />
        </clipPath>
        <radialGradient id={`glow-${id}`} cx=".45" cy=".4" r=".75">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#ececec" />
        </radialGradient>
        <marker id={`arrow-${id}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 L8 5 L1 9" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <rect width={W} height={H} fill="#fff" />
      <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke={INK} strokeWidth="2.4" />
      <rect x="14" y="14" width={W - 28} height={H - 28} fill="none" stroke={INK} strokeWidth=".8" />

      {/* title banner */}
      <rect x="22" y="22" width="256" height="62" fill={INK} />
      <text x="150" y="44" textAnchor="middle" fill="#fff" className="step-n" letterSpacing="5">STEP {n}</text>
      <text x="150" y="72" textAnchor="middle" fill="#fff" className="step-t" letterSpacing="6">{title}</text>

      {/* picture window */}
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill={`url(#glow-${id})`} />
      <g clipPath={`url(#win-${id})`}>{children}</g>
      <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} fill="none" stroke={INK} strokeWidth="1" />

      <text x="150" y="372" textAnchor="middle" fill={INK} className="step-c">{caption}</text>
    </svg>
  );
}

// Red-glove cutout (412 x 947). Thread leaves the reel's middle at (235, 140) in the image.
const GLOVE = { w: 412, h: 947, ox: 235, oy: 140 };
function Glove({ x, y, s }: { x: number; y: number; s: number }) {
  // x, y = where the thread origin should land on the card
  return (
    <image href="/itr-hand.webp" width={GLOVE.w * s} height={GLOVE.h * s} x={x - GLOVE.ox * s} y={y - GLOVE.oy * s} />
  );
}

function Ring({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id={`metal-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".35" stopColor="#bdbdbd" />
          <stop offset=".6" stopColor="#f2f2f2" />
          <stop offset="1" stopColor="#7d7d7d" />
        </linearGradient>
      </defs>
      <ellipse cx="2" cy="20" rx="20" ry="4" fill="#000" opacity=".12" />
      <ellipse rx="19" ry="17" fill="none" stroke="#222" strokeWidth="8.5" />
      <ellipse rx="19" ry="17" fill="none" stroke={`url(#metal-${id})`} strokeWidth="6" />
      <path d="M-13 -9 A15 13 0 0 1 4 -16" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M-4 -24 L0 -32 L4 -24 Z" fill={RED} stroke="#222" strokeWidth=".8" />
    </g>
  );
}

export function StepClip() {
  // Jacket photo (1072 x 1008), reel at ~(520, 350), thread at x≈524 below y≈400.
  const s = 0.4;
  const x = 150 - 520 * s;
  const y = 205 - 350 * s;
  return (
    <Card id="clip" n="I" title="CLIP" caption="Clip the reel inside your jacket.">
      <image href="/itr-jacket.webp" width={1072 * s} height={1008 * s} x={x} y={y} />
      <line x1={x + 524 * s} y1={y + 392 * s} x2={x + 524 * s} y2={WIN.y + WIN.h} stroke={RED} strokeWidth="1.6" />
    </Card>
  );
}

export function StepPull() {
  const o = { x: 132, y: 168 };
  return (
    <Card id="pull" n="II" title="PULL" caption="Draw out a length of thread.">
      <Glove x={o.x} y={o.y} s={0.44} />
      <path
        d={`M${o.x} ${o.y} C ${o.x + 50} ${o.y + 4}, ${o.x + 100} ${o.y + 26}, 264 ${o.y + 78}`}
        fill="none"
        stroke={RED}
        strokeWidth="1.8"
        markerEnd="url(#arrow-pull)"
      />
      <g stroke={RED} strokeWidth="1.1" strokeLinecap="round" opacity=".55">
        <line x1="218" y1="230" x2="236" y2="238" />
        <line x1="212" y1="242" x2="228" y2="249" />
      </g>
    </Card>
  );
}

export function StepHook() {
  const o = { x: 118, y: 156 };
  const ring = { x: 228, y: 290 };
  return (
    <Card id="hook" n="III" title="HOOK" caption="Loop it on a ring, a card or a bill.">
      <Glove x={o.x} y={o.y} s={0.44} />
      <path
        d={`M${o.x} ${o.y} C ${o.x + 70} ${o.y + 10}, ${ring.x} ${ring.y - 90}, ${ring.x} ${ring.y - 32}`}
        fill="none"
        stroke={RED}
        strokeWidth="1.6"
      />
      <Ring x={ring.x} y={ring.y} id="hook" />
    </Card>
  );
}

export function StepFly() {
  // Hero art (1042 x 1389): can centre ~(540, 690).
  const s = 0.36;
  const x = 150 - 540 * s;
  const y = 232 - 690 * s;
  return (
    <Card id="fly" n="IV" title="FLY" caption="Lift your hand. It flies.">
      <image href="/hero-v4.webp" width={1042 * s} height={1389 * s} x={x} y={y} />
    </Card>
  );
}
