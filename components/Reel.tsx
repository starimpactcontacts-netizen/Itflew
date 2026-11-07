// Engraving-style thread reel. Pure SVG so it stays crisp at any size.
export default function Reel({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" role="img" aria-label="The ITR thread reel">
      <defs>
        <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#121214" strokeWidth="1.3" />
        </pattern>
        <pattern id="hatch-fine" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(55)">
          <line x1="0" y1="0" x2="0" y2="3.4" stroke="#121214" strokeWidth="0.9" />
        </pattern>
        <clipPath id="face">
          <circle cx="112" cy="128" r="84" />
        </clipPath>
      </defs>

      {/* body depth (side of the disc) */}
      <ellipse cx="124" cy="136" rx="86" ry="86" fill="#121214" />
      <ellipse cx="124" cy="136" rx="86" ry="86" fill="url(#hatch)" opacity=".6" />

      {/* front face */}
      <circle cx="112" cy="128" r="84" fill="#f6ecd9" stroke="#121214" strokeWidth="3" />
      {/* shading crescent */}
      <g clipPath="url(#face)">
        <circle cx="140" cy="156" r="92" fill="none" stroke="url(#hatch-fine)" strokeWidth="44" />
      </g>
      {/* rings */}
      <circle cx="112" cy="128" r="66" fill="none" stroke="#121214" strokeWidth="2" />
      <circle cx="112" cy="128" r="60" fill="none" stroke="#121214" strokeWidth="0.8" />
      <circle cx="112" cy="128" r="30" fill="#f6ecd9" stroke="#121214" strokeWidth="2.4" />
      <circle cx="112" cy="128" r="30" fill="url(#hatch)" opacity=".35" />
      <circle cx="112" cy="128" r="9" fill="#121214" />
      <circle cx="109" cy="125" r="2.4" fill="#f6ecd9" />
      {/* screws */}
      {[0, 90, 180, 270].map((a) => {
        const r = 46;
        const x = 112 + r * Math.cos(((a + 45) * Math.PI) / 180);
        const y = 128 + r * Math.sin(((a + 45) * Math.PI) / 180);
        return (
          <g key={a}>
            <circle cx={x} cy={y} r="4.5" fill="#f6ecd9" stroke="#121214" strokeWidth="1.6" />
            <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="#121214" strokeWidth="1.2" />
          </g>
        );
      })}
      {/* thread eyelet at top */}
      <rect x="102" y="34" width="20" height="16" rx="3" fill="#f6ecd9" stroke="#121214" strokeWidth="2.4" />
      <rect x="102" y="34" width="20" height="16" rx="3" fill="url(#hatch-fine)" opacity=".5" />
      <circle cx="112" cy="40" r="2.6" fill="#121214" />
    </svg>
  );
}
