"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { trackOrder, type TrackState, type TrackedOrder } from "@/app/actions/track";

const STEPS: { key: TrackedOrder["status"]; label: string }[] = [
  { key: "processing", label: "Order placed" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function Result({ order, onBack }: { order: TrackedOrder; onBack: () => void }) {
  const cancelled = order.status === "cancelled";
  const current = STEPS.findIndex((s) => s.key === order.status);
  return (
    <div className="tk-result">
      <div className="tk-result-head">
        <span>Order {order.order_number}</span>
        <span>Placed {fmt(order.created_at)}</span>
      </div>
      {cancelled ? (
        <p className="tk-cancel">This order was cancelled.</p>
      ) : (
        <ol className="tk-steps">
          {STEPS.map((s, i) => (
            <li key={s.key} className={i <= current ? "done" : ""} aria-current={i === current ? "step" : undefined}>
              <i aria-hidden />
              <span>{s.label}</span>
            </li>
          ))}
        </ol>
      )}
      {order.tracking_number && (
        <p className="tk-ship">
          {order.carrier ?? "Tracking"}:{" "}
          {order.tracking_url ? (
            <a href={order.tracking_url} target="_blank" rel="noopener noreferrer">{order.tracking_number}</a>
          ) : (
            order.tracking_number
          )}
        </p>
      )}
      <p className="tk-muted">Last update {fmt(order.updated_at)}</p>
      <button className="tk-link" onClick={onBack}>Track another order</button>
    </div>
  );
}

export default function TrackForm() {
  const [state, action, pending] = useActionState<TrackState, FormData>(trackOrder, null);
  const [order, setOrder] = useState("");
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(true);
  const ready = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && order.trim().length > 2;

  if (state?.kind === "found" && showResult) return <Result order={state.order} onBack={() => setShowResult(false)} />;

  return (
    <form action={(fd) => { setShowResult(true); action(fd); }} className="tk-form">
      <label className="tk-field">
        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " autoComplete="email" />
        <span>* Email address</span>
      </label>
      <label className="tk-field">
        <input name="order" value={order} onChange={(e) => setOrder(e.target.value)} required placeholder=" " autoComplete="off" maxLength={64} />
        <span>* Order number</span>
      </label>
      {state?.kind === "error" && <p className="tk-err" role="alert">{state.message}</p>}
      <button className="tk-btn" disabled={!ready || pending}>{pending ? "Checking…" : "Continue"}</button>
      <p className="tk-muted tk-help">Your order number starts with IF and is in your confirmation email. <Link href="/products/invisible-thread">Shop Invisible Thread</Link></p>
    </form>
  );
}
