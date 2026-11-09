"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadStripe, type Stripe as StripeJs, type StripeElements } from "@stripe/stripe-js";
import {
  AddressElement,
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/products";

type Intent = {
  id: string;
  clientSecret: string;
  publishableKey: string;
  orderNumber: string;
  qty: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  welcome: boolean;
  error?: string;
};

const money = (cents: number) => formatPrice(cents / 100);
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const appearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#33353a",
    colorText: "#222222",
    colorTextSecondary: "#777777",
    colorDanger: "#b22423",
    borderRadius: "8px",
    fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif",
    spacingUnit: "4px",
  },
};

async function callIntent(body: object): Promise<Intent> {
  const r = await fetch("/api/checkout/intent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return r.json();
}

export default function Checkout() {
  const { qty } = useCart();
  const [intent, setIntent] = useState<Intent | null>(null);
  const [stripeP, setStripeP] = useState<Promise<StripeJs | null> | null>(null);
  const [failed, setFailed] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (qty < 1 || started.current) return;
    started.current = true;
    callIntent({ qty }).then((i) => {
      if (i.error || !i.clientSecret || !i.publishableKey) return setFailed(i.error ?? "Checkout is unavailable right now.");
      setIntent(i);
      setStripeP(loadStripe(i.publishableKey));
    }, () => setFailed("Checkout is unavailable right now."));
  }, [qty]);

  if (qty < 1 && !intent)
    return (
      <div className="co-empty">
        <p>Your bag is empty.</p>
        <Link href="/products/itr" className="dr-add co-btn-link"><span>Shop Invisible Thread</span><span>›</span></Link>
      </div>
    );
  if (failed) return <p className="co-error" role="alert">{failed}</p>;
  if (!intent || !stripeP) return <p className="co-loading">Preparing secure checkout…</p>;

  return (
    <Elements stripe={stripeP} options={{ clientSecret: intent.clientSecret, appearance }}>
      <Form intent={intent} setIntent={setIntent} />
    </Elements>
  );
}

function Form({ intent, setIntent }: { intent: Intent; setIntent: (i: Intent) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { qty, setQty } = useCart();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [expressReady, setExpressReady] = useState(false);

  const refresh = useCallback(
    async (next: { qty?: number; email?: string }) => {
      const i = await callIntent({ id: intent.id, qty: next.qty ?? qty, email: next.email ?? email });
      if (i.error) return setMsg(i.error);
      setIntent({ ...intent, ...i, clientSecret: intent.clientSecret });
      await (elements as StripeElements | null)?.fetchUpdates();
    },
    [intent, qty, email, elements, setIntent]
  );

  // keep price in sync if the bag changes in another tab/drawer
  useEffect(() => {
    if (qty >= 1 && qty !== intent.qty) refresh({ qty });
  }, [qty]); // eslint-disable-line react-hooks/exhaustive-deps

  const pay = async () => {
    if (!stripe || !elements) return;
    if (!EMAIL.test(email)) return setMsg("Enter your email so we can send your receipt.");
    setBusy(true);
    setMsg("");
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setBusy(false);
      return setMsg(submitError.message ?? "Check your details.");
    }
    await refresh({ email });
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success`, receipt_email: email },
    });
    setBusy(false);
    if (error) setMsg(error.message ?? "Payment failed. Try again.");
  };

  return (
    <div className="co-grid">
      <div className="co-main">
        <div className={`co-express${expressReady ? "" : " hidden"}`}>
          <p className="co-label">Express checkout</p>
          <ExpressCheckoutElement
            options={{ buttonHeight: 52, buttonTheme: { applePay: "black", googlePay: "black" } }}
            onReady={(e) => setExpressReady(!!e.availablePaymentMethods)}
            onConfirm={async () => {
              if (!stripe || !elements) return;
              const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: { return_url: `${window.location.origin}/checkout/success` },
              });
              if (error) setMsg(error.message ?? "Payment failed.");
            }}
          />
          <div className="co-or"><span>or pay with card</span></div>
        </div>

        <section className="co-sec">
          <h2>Contact</h2>
          <input
            className="co-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => EMAIL.test(email) && refresh({ email })}
          />
          {intent.welcome && <p className="co-ok">Welcome offer applied: 10% off your first order.</p>}
        </section>

        <section className="co-sec">
          <h2>Delivery</h2>
          <AddressElement options={{ mode: "shipping", fields: { phone: "never" } }} />
        </section>

        <section className="co-sec">
          <h2>Payment</h2>
          <PaymentElement options={{ layout: "tabs" }} />
        </section>

        {msg && <p className="co-error" role="alert">{msg}</p>}
        <button className="dr-add co-pay" onClick={pay} disabled={busy || !stripe}>
          <span>{busy ? "Processing…" : "Pay now"}</span>
          <span>{money(intent.total)}</span>
        </button>
        <p className="co-secure">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
          Secure payment by Stripe. We never see your card details.
        </p>
      </div>

      <aside className="co-sum">
        <h2>Order summary</h2>
        <div className="co-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/product/reel-angle-v2.webp" alt="" />
          <div>
            <strong>Invisible Thread</strong>
            <div className="co-qty">
              <button aria-label="Decrease" onClick={() => qty > 1 && setQty(qty - 1)}>−</button>
              <span>{qty}</span>
              <button aria-label="Increase" onClick={() => qty < 10 && setQty(qty + 1)}>+</button>
            </div>
          </div>
          <span>{money(intent.subtotal)}</span>
        </div>
        <dl>
          <div><dt>Subtotal</dt><dd>{money(intent.subtotal)}</dd></div>
          {intent.discount > 0 && <div className="co-disc"><dt>Welcome 10%</dt><dd>−{money(intent.discount)}</dd></div>}
          <div><dt>Shipping</dt><dd>{intent.shipping ? money(intent.shipping) : "Free"}</dd></div>
          <div className="co-total"><dt>Total</dt><dd>{money(intent.total)}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
