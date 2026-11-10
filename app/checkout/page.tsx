import type { Metadata } from "next";
import Checkout from "@/components/Checkout";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <main className="co">
      <h1 className="sr-only">Checkout</h1>
      <Checkout />
    </main>
  );
}
