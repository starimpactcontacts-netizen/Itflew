import Reel from "./Reel";

// Reel on the left, thread rising to a floating card and ring on the right.
export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden>
      <Reel className="hero-reel" />
      <svg className="hero-thread" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path
          d="M40 290 C 120 200, 180 150, 300 70"
          fill="none"
          stroke="#f6ecd9"
          strokeWidth="1.4"
          strokeDasharray="3 5"
          opacity=".75"
        />
      </svg>
      <svg className="hero-card float" viewBox="0 0 120 168">
        <defs>
          <pattern id="card-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="#121214" strokeWidth="0.9" />
          </pattern>
        </defs>
        <rect x="6" y="10" width="108" height="152" rx="9" fill="#121214" />
        <rect x="2" y="4" width="108" height="152" rx="9" fill="#f6ecd9" stroke="#121214" strokeWidth="2.6" />
        <rect x="12" y="14" width="88" height="132" rx="5" fill="none" stroke="#121214" strokeWidth="1" />
        <text x="14" y="36" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#c8322a">A</text>
        <path d="M24 44 l-6 8 6 8 6-8z" fill="#c8322a" />
        <path d="M56 58 l-22 30 22 30 22-30z" fill="#c8322a" stroke="#121214" strokeWidth="1.6" />
        <path d="M56 58 l22 30 -22 30z" fill="url(#card-hatch)" opacity=".55" />
        <g transform="rotate(180 56 80)">
          <text x="14" y="36" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#c8322a">A</text>
        </g>
      </svg>
      <svg className="hero-ring float float-slow" viewBox="0 0 80 80">
        <ellipse cx="40" cy="40" rx="30" ry="22" fill="none" stroke="#121214" strokeWidth="9" />
        <ellipse cx="40" cy="40" rx="30" ry="22" fill="none" stroke="#e8c66a" strokeWidth="5.5" />
        <ellipse cx="34" cy="22" rx="8" ry="2.4" fill="#fff7d6" />
      </svg>
    </div>
  );
}
