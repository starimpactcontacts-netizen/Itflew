// Vintage instruction-card illustrations for each step of the trick.
// Line-art in ink on cream, with the "invisible" thread drawn in red so it reads.
const INK = "#1d1d1f";
const RED = "#b22423";
const CREAM = "#f7efe2";

function Frame({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 380" className="step-svg" role="img" aria-label={`Step ${n}: ${title}`}>
      <rect width="300" height="380" fill={CREAM} />
      <rect x="10" y="10" width="280" height="360" fill="none" stroke={INK} strokeWidth="2.5" />
      <rect x="16" y="16" width="268" height="348" fill="none" stroke={INK} strokeWidth="1" />
      {/* banner */}
      <rect x="34" y="34" width="232" height="54" fill={INK} />
      <text x="150" y="58" textAnchor="middle" fill={CREAM} fontFamily="Georgia, serif" fontSize="13" letterSpacing="4">
        STEP {n}
      </text>
      <text x="150" y="80" textAnchor="middle" fill={CREAM} fontFamily="Georgia, serif" fontSize="20" letterSpacing="5" fontWeight="700">
        {title}
      </text>
      <g fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

// The ITR: clear tube with two black end caps and a clip.
function Reel({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <rect x="-34" y="-9" width="68" height="18" rx="4" fill={CREAM} />
      <line x1="-20" y1="-4" x2="20" y2="-4" strokeWidth="1" />
      <rect x="-52" y="-11" width="20" height="22" rx="7" fill={INK} />
      <rect x="32" y="-11" width="20" height="22" rx="7" fill={INK} />
      <path d="M-14 -9 v-6 h26 l6 -4" strokeWidth="1.6" />
    </g>
  );
}

// Simple engraved-style hand, fingers pointing down.
function Hand({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} fill={CREAM}>
      <path d="M-30 -60 C-34 -30 -32 -10 -26 4 C-24 16 -20 30 -18 44 C-16 52 -8 52 -8 44 L-8 18 C-6 32 -4 50 -2 58 C0 66 8 64 8 56 L8 22 C10 36 12 50 14 56 C16 64 24 62 24 54 L22 20 C24 30 26 40 28 44 C30 50 38 48 36 40 L32 4 C34 -16 36 -36 34 -60 Z" />
      <path d="M-20 -30 q6 4 12 0 M-2 -24 q6 4 12 0" strokeWidth="1" />
    </g>
  );
}

function Ring({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx="22" ry="9" strokeWidth="5" />
      <ellipse rx="22" ry="9" stroke={CREAM} strokeWidth="1.4" />
      <path d="M-6 -12 l6 -10 l6 10 z" fill={CREAM} />
    </g>
  );
}

function Sparks({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeWidth="1.6">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="0" y1="-34" x2="0" y2="-44" transform={`rotate(${a})`} />
      ))}
    </g>
  );
}

export function StepClip() {
  return (
    <Frame n="I" title="CLIP">
      {/* jacket lapel + lining */}
      <path d="M60 120 L130 330 M240 120 L170 330" />
      <path d="M130 330 L150 260 L170 330" />
      <path d="M90 120 C110 170 120 200 140 230 M210 120 C190 170 180 200 160 230" strokeWidth="1.2" />
      <Reel x={150} y={170} r={-8} s={1} />
      <path d="M150 182 L150 330" stroke={RED} strokeWidth="1.6" strokeDasharray="5 4" />
      <path d="M232 168 l14 -6 m-14 18 l16 0 m-14 12 l14 6" strokeWidth="1.4" />
    </Frame>
  );
}

export function StepPull() {
  return (
    <Frame n="II" title="PULL">
      <Reel x={95} y={170} r={0} s={0.9} />
      <path d="M142 170 C175 170 195 180 205 205" stroke={RED} strokeWidth="2" />
      <Hand x={215} y={260} r={180} s={0.9} />
      <path d="M150 240 l-26 0 m6 -8 l-8 8 l8 8" strokeWidth="1.6" />
      <text x="150" y="340" textAnchor="middle" fill={INK} stroke="none" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic">
        draw out a length of thread
      </text>
    </Frame>
  );
}

export function StepHook() {
  return (
    <Frame n="III" title="HOOK">
      <Hand x={150} y={150} s={0.85} />
      <path d="M150 205 L150 265" stroke={RED} strokeWidth="2" />
      <Ring x={150} y={276} />
      <circle cx="150" cy="276" r="52" strokeWidth="1.4" strokeDasharray="3 5" />
      <text x="150" y="350" textAnchor="middle" fill={INK} stroke="none" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic">
        loop it on a ring, card or bill
      </text>
    </Frame>
  );
}

export function StepFly() {
  return (
    <Frame n="IV" title="FLY">
      <Hand x={150} y={150} s={0.85} />
      <path d="M150 205 L150 232" stroke={RED} strokeWidth="1.4" strokeDasharray="3 4" opacity=".7" />
      <Ring x={150} y={244} />
      <Sparks x={150} y={244} />
      <path d="M150 330 L150 296 M140 306 l10 -10 l10 10" strokeWidth="1.8" />
      <path d="M118 300 q-8 -14 0 -28 M182 300 q8 -14 0 -28" strokeWidth="1.2" />
    </Frame>
  );
}
