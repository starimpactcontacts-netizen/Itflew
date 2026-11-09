import type { Metadata } from "next";
import Checkout from "@/components/Checkout";

export const metadata: Metadata = { title: "Checkout | It Flew!", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <main className="co">
      <h1 className="co-title">Checkout</h1>
      <Checkout />
    </main>
  );
}
