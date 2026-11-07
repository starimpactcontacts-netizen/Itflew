"use client";

import { useActionState, useState } from "react";
import { trackOrder, type TrackState, type TrackedOrder } from "@/app/actions/track";

const STEPS: { key: TrackedOrder["status"]; label: string }[] = [
  { key: "processing", label: "Order placed" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function Result({ order }: { order: TrackedOrder }) {
  const cancelled = order.status === "cancelled";
  const current = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="track-result">
      <div className="track-head">
        <div>
          <p className="kicker kicker-red">Order</p>
          <h2 className="display track-num">#{order.order_number}</h2>
        </div>
        <p className="muted small">Placed {fmt(order.created_at)}</p>
      </div>

      {cancelled ? (
        <p className="track-cancel">This order was cancelled.</p>
      ) : (
        <ol className="timeline">
          {STEPS.map((s, i) => (
            <li key={s.key} className={i <= current ? "done" : ""} aria-current={i === current ? "step" : undefined}>
              <span className="dot" />
              <span>{s.label}</span>
            </li>
          ))}
        </ol>
      )}

      {order.tracking_number && (
        <div className="track-ship">
          <span className="muted small">{order.carrier ?? "Tracking"}</span>
          {order.tracking_url ? (
            <a href={order.tracking_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {order.tracking_number} ↗
            </a>
          ) : (
            <strong>{order.tracking_number}</strong>
          )}
        </div>
      )}
      <p className="muted small">Last update {fmt(order.updated_at)}</p>
    </div>
  );
}

export default function TrackForm() {
  const [state, action, pending] = useActionState<TrackState, FormData>(trackOrder, null);
  const [order, setOrder] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <form action={action} className="track-form">
        <label>
          <span>Order number</span>
          <input name="order" value={order} onChange={(e) => setOrder(e.target.value)} required placeholder="e.g. IF1001" autoComplete="off" maxLength={64} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" autoComplete="email" />
        </label>
        <button className="btn btn-red btn-block" disabled={pending}>
          {pending ? "Checking…" : "Track order"}
        </button>
        {state?.kind === "error" && <p className="form-msg err" role="alert">{state.message}</p>}
      </form>
      {state?.kind === "found" && <Result order={state.order} />}
    </>
  );
}
