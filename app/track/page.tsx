import type { Metadata } from "next";
import TrackForm from "@/components/TrackForm";

export const metadata: Metadata = { title: "Track Your Order | It Flew!" };

export default function TrackPage() {
  return (
    <main className="track">
      <h1 className="display track-title">Track Your Order</h1>
      <p className="muted">Enter the order number from your confirmation email and the email you ordered with.</p>
      <TrackForm />
    </main>
  );
}
