import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import { ITR, formatPrice } from "@/lib/products";

export const metadata: Metadata = {
  title: "The ITR — Small Invisible Thread Reel | It Flew!",
  description: ITR.blurb,
};

export default function ProductPage() {
  return (
    <main className="pdp">
      <div className="pdp-img">
        <Image
          src="/itr-glove.webp"
          alt="A red-gloved hand holding the ITR invisible thread reel"
          width={768}
          height={1369}
          priority
          unoptimized
        />
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
