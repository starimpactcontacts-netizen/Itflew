import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Poster from "@/components/Poster";
import AddToCart from "@/components/AddToCart";
import { ITR, formatPrice } from "@/lib/products";

export const metadata: Metadata = {
  title: "Invisible Thread | It Flew!",
  description: ITR.blurb,
};

export default function ProductPage() {
  return (
    <main className="pdp">
      <div className="pdp-gallery">
        <div className="pdp-shot">
          <Poster priority />
        </div>
        <div className="pdp-shot">
          <Image
            src="/itr-jacket.webp"
            alt="Invisible Thread clipped inside a jacket, its invisible thread running down the lining"
            width={1072}
            height={1008}
            unoptimized
          />
        </div>
      </div>
      <div className="pdp-info">
        <nav className="crumbs small">
          <Link href="/">Home</Link> / <span>{ITR.name}</span>
        </nav>
        <p className="kicker">{ITR.short}</p>
        <h1 className="display pdp-title">{ITR.name}</h1>
        <p className="price price-lg">{formatPrice(ITR.price)}</p>
        <p className="pdp-text">{ITR.blurb}</p>
        <AddToCart withQty />
        <h2 className="display pdp-sub">What you get</h2>
        <ul className="checks">
          {ITR.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
