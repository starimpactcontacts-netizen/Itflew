import type { Metadata } from "next";
import PdpGallery from "@/components/PdpGallery";
import PdpBuy from "@/components/PdpBuy";
import PdpStory from "@/components/PdpStory";
import { ITR } from "@/lib/products";

export const metadata: Metadata = {
  title: "Invisible Thread | It Flew!",
  description: ITR.blurb,
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
