import type { Metadata } from "next";
import PdpGallery from "@/components/PdpGallery";
import PdpBuy from "@/components/PdpBuy";
import PdpStory from "@/components/PdpStory";
import { ITR } from "@/lib/products";

export const metadata: Metadata = {
  title: "Invisible Thread Reel for Magic Levitation",
  description: "Invisible Thread by It Flew!: a pocket-sized invisible thread reel that makes cans, rings, cards and bills float. $19, video tutorial included, ships within 48 hours.",
  alternates: { canonical: "/products/invisible-thread" },
  openGraph: {
    title: "Invisible Thread | It Flew!",
    description: "A pocket-sized invisible thread reel. Clip it on, draw the thread and make anything fly.",
    url: "/products/invisible-thread",
    images: [{ url: "/product/reel-angle-v2.webp", width: 1896, height: 2528, alt: "It Flew! Invisible Thread reel" }],
  },
};


export default function ProductPage() {
  return (
    <main className="pd">
      <div className="pd-top">
        <PdpGallery />
        <div className="pd-info">
          <PdpBuy />
        </div>
      </div>
      <PdpStory />
    </main>
  );
}
