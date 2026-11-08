import Image from "next/image";

// Illustrated step cards (public/steps). Shown at original quality.
const CARDS = [
  { src: "/steps/step-1-bw.webp", w: 936, h: 1136, alt: "It Flew! — how the ITR works: clip the reel at your collar, draw the thread, make a can fly" },
  { src: "/steps/step-2-bw.webp", w: 928, h: 1126, alt: "Step 2: hold the magic reel and draw the thread off the spool" },
  { src: "/steps/step-3-bw.webp", w: 928, h: 1127, alt: "Step 3: stand over the can with your hands out" },
  { src: "/steps/step-4-bw.webp", w: 928, h: 1127, alt: "Step 4: the can rises into your hand" },
];

export function StepImage({ i }: { i: number }) {
  const c = CARDS[i];
  return <Image src={c.src} alt={c.alt} width={c.w} height={c.h} unoptimized className="step-img" />;
}
export const STEP_COUNT = CARDS.length;
