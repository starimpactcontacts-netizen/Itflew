// Tutorial step cards: hand-drawn engraving-style illustrations (public/steps/*.svg)
// set in a vintage instruction-card frame. Thread is drawn in brand red.
const RED = "#b22423";
const INK = "#000";
const W = 300;
const H = 400;
const WIN = { x: 26, y: 96, s: 248 };

function Card({ n, title, caption, src }: { n: string; title: string; caption: string; src: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="step-svg" role="img" aria-label={`Step ${n}: ${title}. ${caption}`}>
      <rect width={W} height={H} fill="#fbfaf6" />
      <rect x="8" y="8" width={W - 16} height={H - 16} fill="none" stroke={INK} strokeWidth="2.6" />
      <rect x="14" y="14" width={W - 28} height={H - 28} fill="none" stroke={INK} strokeWidth=".8" />
      {/* corner ticks */}
      {[[14, 14], [W - 14, 14], [14, H - 14], [W - 14, H - 14]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={RED} />
      ))}
      <rect x="26" y="24" width="248" height="58" fill={INK} />
      <rect x="29" y="27" width="242" height="52" fill="none" stroke="#fbfaf6" strokeWidth=".6" />
      <text x="150" y="45" textAnchor="middle" fill="#fbfaf6" className="step-n" letterSpacing="5">STEP {n}</text>
      <text x="150" y="71" textAnchor="middle" fill="#fbfaf6" className="step-t" letterSpacing="6">{title}</text>
      <image href={src} x={WIN.x} y={WIN.y} width={WIN.s} height={WIN.s} />
      <rect x={WIN.x} y={WIN.y} width={WIN.s} height={WIN.s} fill="none" stroke={INK} strokeWidth="1.2" />
      <text x="150" y="370" textAnchor="middle" fill={INK} className="step-c">{caption}</text>
    </svg>
  );
}

export const StepClip = () => <Card n="I" title="CLIP" caption="Clip the reel inside your jacket." src="/steps/step-1.svg" />;
export const StepPull = () => <Card n="II" title="PULL" caption="Draw out a length of thread." src="/steps/step-2.svg" />;
export const StepHook = () => <Card n="III" title="HOOK" caption="Loop it through a ring, a card or a bill." src="/steps/step-3.svg" />;
export const StepFly = () => <Card n="IV" title="FLY" caption="Lift your hand. It flies." src="/steps/step-4.svg" />;
