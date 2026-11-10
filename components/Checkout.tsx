"use client";

import Link from "next/link";
import DeliveryEstimate from "./DeliveryEstimate";
import { useDelivery } from "./useDelivery";
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
    callIntent({ qty }).then(async (i) => {
      if ((i as unknown as { hosted?: boolean }).hosted) {
        const r = await fetch("/api/checkout/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ qty }) });
        const d = (await r.json()) as { url?: string; error?: string };
        if (d.url) return window.location.assign(d.url);
        return setFailed(d.error ?? "Checkout is unavailable right now.");
      }
      if (i.error || !i.clientSecret || !i.publishableKey) return setFailed(i.error ?? "Checkout is unavailable right now.");
      setIntent(i);
      setStripeP(loadStripe(i.publishableKey));
    }, () => setFailed("Checkout is unavailable right now."));
  }, [qty]);

  if (qty < 1 && !intent)
    return (
      <div className="co-empty">
        <p>Your bag is empty.</p>
        <Link href="/products/invisible-thread" className="co-primary"><span>Shop Invisible Thread</span><span>›</span></Link>
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


function PayMarks() {
  return (
    <div className="co-marks" aria-label="Accepted payment methods">
      <span className="pm pm-apple"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.3.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1-2.8-4.3zM13.9 5.3c.7-.8 1.2-2 1.1-3.2-1 0-2.3.7-3 1.5-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.4z" /></svg>Pay</span>
      <span className="pm pm-visa co-visa">VISA</span>
      <span className="pm pm-mc co-mc" aria-label="Mastercard"><i /><i /></span>
      <span className="pm co-amex">AM<br />EX</span>
      <span className="pm co-disc">DISC<b>●</b>VER</span>
    </div>
  );
}

function Acc({ icon, title, open, children }: { icon: React.ReactNode; title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details className="co-acc" open={open}>
      <summary>
        {icon}
        <span>{title}</span>
        <svg className="co-chev" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M5 9l7 7 7-7" /></svg>
      </summary>
      <div className="co-acc-body">{children}</div>
    </details>
  );
}

function Form({ intent, setIntent }: { intent: Intent; setIntent: (i: Intent) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { qty, setQty } = useCart();
  const [step, setStep] = useState<"review" | "details">("review");
  const delivery = useDelivery();
  const [editQty, setEditQty] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [expressReady, setExpressReady] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  const refresh = useCallback(
    async (next: { qty?: number; email?: string }) => {
      const i = await callIntent({ id: intent.id, qty: next.qty ?? qty, email: next.email ?? email });
      if (i.error) return setMsg(i.error);
      setIntent({ ...intent, ...i, clientSecret: intent.clientSecret });
      await (elements as StripeElements | null)?.fetchUpdates();
    },
    [intent, qty, email, elements, setIntent]
  );

  useEffect(() => {
    if (qty >= 1 && qty !== intent.qty) refresh({ qty });
  }, [qty]); // eslint-disable-line react-hooks/exhaustive-deps

  const returnUrl = () => `${window.location.origin}/checkout/success`;

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
    const { error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: returnUrl(), receipt_email: email } });
    setBusy(false);
    if (error) setMsg(error.message ?? "Payment failed. Try again.");
  };

  const go = (s: "review" | "details") => {
    setStep(s);
    setMsg("");
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  if (qty < 1)
    return (
      <div className="co-empty">
        <p>Your bag is empty.</p>
        <Link href="/products/invisible-thread" className="co-primary"><span>Shop Invisible Thread</span><span>›</span></Link>
      </div>
    );

  const totals = (
    <dl className="co-totals">
      <div><dt>Subtotal</dt><dd>{money(intent.subtotal)}</dd></div>
      {intent.discount > 0 && <div className="co-disc-row"><dt>Welcome offer (10%)</dt><dd>−{money(intent.discount)}</dd></div>}
      <div><dt>Delivery</dt><dd>{intent.shipping ? money(intent.shipping) : "Free"}</dd></div>
      {(intent.discount > 0 || intent.shipping > 0) && <div className="co-grand"><dt>Total</dt><dd>{money(intent.total)}</dd></div>}
    </dl>
  );

  return (
    <div className="co-wrap" ref={top}>
      {/* ORDER SUMMARY */}
      <section className="co-block">
        <div className="co-h">
          <h2>Order Summary</h2>
          <span>{qty} {qty === 1 ? "product" : "products"}</span>
        </div>
        <div className="co-item">
          <div className="co-item-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/product/reel-angle-v2.webp" alt="Invisible Thread reel" />
          </div>
          <div className="co-item-info">
            <p className="co-item-name">Invisible Thread</p>
            <p className="co-item-sub">Small reel, one thread, endless tricks</p>
            <p className="co-item-qty">
              Qty: {qty}{" "}
              <button className="co-u" onClick={() => setEditQty(!editQty)}>{editQty ? "done" : "edit"}</button>
            </p>
            {editQty && (
              <div className="co-qty-pick">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} className={n === qty ? "on" : ""} onClick={() => { setQty(n); setEditQty(false); }}>{n}</button>
                ))}
              </div>
            )}
            <div className="co-item-foot">
              <button className="co-u co-muted" onClick={() => setQty(0)}>Remove</button>
              <span>{money(intent.subtotal)}</span>
            </div>
          </div>
        </div>
      </section>

      {step === "review" ? (
        <section className="co-block">
          <h2 className="co-h2">Total</h2>
          {totals}
          <DeliveryEstimate shipping={intent.shipping / 100} />
          <button className="co-primary" onClick={() => go("details")}>
            <span>Continue to checkout</span>
            <span>{money(intent.total)}</span>
          </button>
          <div className={`co-express${expressReady ? "" : " hidden"}`}>
            <div className="co-or"><span>or pay with</span></div>
            <ExpressCheckoutElement
              options={{
                buttonHeight: 54,
                buttonType: { applePay: "plain", googlePay: "plain" },
                buttonTheme: { applePay: "white-outline", googlePay: "white" },
                paymentMethods: { applePay: "always", googlePay: "auto", link: "auto", paypal: "never", amazonPay: "never", klarna: "never" },
                layout: { maxColumns: 1, overflow: "never" },
              }}
              onReady={(e) => setExpressReady(!!e.availablePaymentMethods)}
              onClick={({ resolve }) =>
                resolve({
                  emailRequired: true,
                  shippingAddressRequired: true,
                  shippingRates: [{ id: "standard", displayName: "Standard shipping (7–12 business days)", amount: intent.shipping, deliveryEstimate: { minimum: { unit: "business_day", value: 7 }, maximum: { unit: "business_day", value: 12 } } }],
                })
              }
              onConfirm={async (ev) => {
                if (!stripe || !elements) return;
                const mail = ev.billingDetails?.email ?? undefined;
                if (mail) await refresh({ email: mail });
                const sa = ev.shippingAddress;
                const { error } = await stripe.confirmPayment({
                  elements,
                  confirmParams: {
                    return_url: returnUrl(),
                    receipt_email: mail,
                    shipping: sa ? { name: sa.name, address: { ...sa.address, line2: sa.address.line2 ?? undefined } } : undefined,
                  },
                });
                if (error) setMsg(error.message ?? "Payment failed.");
              }}
            />
          </div>
          {msg && <p className="co-error" role="alert">{msg}</p>}
        </section>
      ) : (
        <>
          <section className="co-block">
            <div className="co-h">
              <h2>Contact</h2>
              <button className="co-u co-muted" onClick={() => go("review")}>Edit bag</button>
            </div>
            <div className="co-card">
              <input
                className="co-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="* Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => EMAIL.test(email) && refresh({ email })}
              />
              {intent.welcome && <p className="co-ok">Welcome offer applied: 10% off your first order.</p>}
            </div>
          </section>
          <section className="co-block">
            <h2 className="co-h2">Delivery</h2>
            <div className="co-card">
              <AddressElement options={{ mode: "shipping", fields: { phone: "never" } }} />
              <p className="co-note">Standard shipping{delivery.place ? ` to ${delivery.place}` : ""} {money(intent.shipping)} · arrives {delivery.range ?? "in 7–12 business days"}</p>
            </div>
          </section>
          <section className="co-block">
            <h2 className="co-h2">Payment</h2>
            <div className="co-card">
              <PaymentElement options={{ layout: "tabs", wallets: { applePay: "never", googlePay: "never" } }} />
            </div>
          </section>
          <section className="co-block">
            <h2 className="co-h2">Total</h2>
            {totals}
            {msg && <p className="co-error" role="alert">{msg}</p>}
            <button className="co-primary" onClick={pay} disabled={busy || !stripe}>
              <span>{busy ? "Processing…" : "Pay now"}</span>
              <span>{money(intent.total)}</span>
            </button>
          </section>
        </>
      )}

      {/* HELP & SERVICES */}
      <section className="co-block">
        <h2 className="co-h2">Help &amp; Services</h2>
        <div className="co-help">
          <Acc
            open
            title="100% secure payment"
            icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 10h18M6 15h5" /></svg>}
          >
            <PayMarks />
            <p>Your card details are encrypted and processed by Stripe. They never touch our servers.</p>
          </Acc>
          <Acc
            title="Need assistance?"
            icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d="M4 18h16M6 18a6 6 0 0 1 12 0M12 9V7" /></svg>}
          >
            <p>Questions before you buy? Email <a href="mailto:support@itflew.com">support@itflew.com</a> or use the chat button.</p>
            <p>Already ordered? <Link href="/track">Track your order</Link> with your email and the order number from your confirmation.</p>
          </Acc>
          <Acc
            title="Standard shipping $7"
            icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></svg>}
          >
            <p>Standard Shipping: $7.00 flat per order, 7–12 business days. Orders are fulfilled within 24–48 hours, and most orders to major metropolitan areas arrive within 5–7 days once dispatched.</p>
          </Acc>
          <Acc
            title="Free returns within 30 days"
            icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><rect x="4" y="5" width="16" height="15" rx="1" /><path d="M4 9h16M9 3v4M15 3v4" /></svg>}
          >
            <p>Return unused reels within 30 days for a full refund. <Link href="/shipping-returns">Shipping &amp; Returns</Link></p>
          </Acc>
        </div>
      </section>
    </div>
  );
}
