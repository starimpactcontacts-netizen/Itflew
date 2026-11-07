"use client";

import { useEffect, useRef } from "react";

// Can + telekinetic strings, drawn in the hero art's own coordinates (1042 x 1389).
// One SVG timeline drives the can and the string ends, so they never drift apart.
const DUR = "4.6s";
const KEY_TIMES = "0;0.28;0.38;0.48;0.9;1";
const SPLINES = ".55 0 .9 .45; .2 .6 .4 1; .42 0 .58 1; .45 0 .25 1; .42 0 .58 1";
const DROP = [0, 115, 68, 88, -18, 0]; // px the can moves: fall, snap, settle, lift, rest

// fingertip -> point on the can rim
const STRINGS: [number, number, number, number][] = [
  [285, 470, 527, 500],
  [410, 440, 585, 486],
  [470, 445, 640, 492],
  [770, 445, 695, 530],
];

export default function HeroLevitate() {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const el = svg.current;
      if (!el) return;
      if (mq.matches) {
        el.pauseAnimations();
        el.setCurrentTime(0);
      } else el.unpauseAnimations();
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const values = (base: number) => DROP.map((d) => base + d).join(";");

  return (
    <svg ref={svg} className="hero-levitate" viewBox="0 0 1042 1389" aria-hidden>
      <defs>
        <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* telekinetic strings */}
      <g className="threads" filter="url(#thread-glow)">
        {STRINGS.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} style={{ animationDelay: `${-i * 0.37}s` }}>
            <animate
              attributeName="y2"
              dur={DUR}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes={KEY_TIMES}
              keySplines={SPLINES}
              values={values(y2)}
            />
            {/* strings flare brightest the moment they snap tight */}
            <animate
              attributeName="stroke-opacity"
              dur={DUR}
              repeatCount="indefinite"
              keyTimes="0;0.26;0.31;0.5;1"
              values=".55;.75;1;.7;.55"
            />
          </line>
        ))}
      </g>

      {/* the can */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          dur={DUR}
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes={KEY_TIMES}
          keySplines={SPLINES}
          values={DROP.map((d) => `0 ${d}`).join(";")}
        />
        <g>
          {/* swings from a point up by the hand, like it hangs on the strings */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur={DUR}
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes={KEY_TIMES}
            keySplines={SPLINES}
            values="0 538 285;-2.5 538 285;1 538 285;-.7 538 285;.5 538 285;0 538 285"
          />
          <image href="/hero-can-v2.webp" x="365" y="479" width="346" height="485" />
        </g>
      </g>
    </svg>
  );
}
