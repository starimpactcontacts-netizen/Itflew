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
    images: [{ url: "/product/invisible-thread-share.jpg", width: 1200, height: 1200, alt: "It Flew! Invisible Thread reel" }],
  },
};


export default function ProductPage() {
  return (
    <main className="pd">
      {/* product tags read by Instagram / Facebook product linking */}
      <meta property="og:type" content="product" />
      <meta property="product:brand" content="It Flew!" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:price:amount" content={ITR.price.toFixed(2)} />
      <meta property="product:price:currency" content="USD" />
      <meta property="product:retailer_item_id" content="invisible-thread" />
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
