import type { Metadata } from "next";
import PdpGallery from "@/components/PdpGallery";
import PdpBuy from "@/components/PdpBuy";
import PdpStory from "@/components/PdpStory";
import { ITR } from "@/lib/products";

export const metadata: Metadata = {
  title: "Levitation Pod: Make Anything Float",
  description: "The Levitation Pod by It Flew! of Stockholm, Sweden: the trick behind the viral telekinesis prank. Clip it to your jacket, attach the can, let it fly. No magic skills needed. $19, tutorial included.",
  alternates: { canonical: "/products/levitation-pod" },
  openGraph: {
    title: "Levitation Pod | It Flew!",
    description: "The trick behind the viral telekinesis prank. Clip it on, attach the can, let it fly. No magic skills needed.",
    url: "/products/levitation-pod",
    images: [{ url: "/product/levitation-pod-share.jpg", width: 1200, height: 1200, alt: "It Flew! Levitation Pod" }],
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
      <meta property="product:retailer_item_id" content="levitation-pod" />
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
