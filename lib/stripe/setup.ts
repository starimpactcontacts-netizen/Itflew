import "server-only";
import type Stripe from "stripe";
import { stripe } from "./server";

// Self-configures the Stripe account the first time checkout runs on a server instance:
// - registers the site domains for Apple Pay / Google Pay / Link
// - makes sure a webhook endpoint exists for this site
const SITE = "https://itflew.vercel.app";
const DOMAINS = ["itflew.vercel.app", "itflew.com", "www.itflew.com"];
const HOOK_URL = `${SITE}/api/stripe/webhook`;
const EVENTS = ["payment_intent.succeeded", "payment_intent.payment_failed"] as const;

let done: Promise<void> | null = null;

export function ensureStripeSetup() {
  done ??= (async () => {
    const s = stripe();
    try {
      const existing = await s.paymentMethodDomains.list({ limit: 100 });
      const have = new Set(existing.data.map((d) => d.domain_name));
      for (const d of DOMAINS) {
        if (!have.has(d)) {
          try {
            await s.paymentMethodDomains.create({ domain_name: d, enabled: true });
          } catch (e) {
            console.warn("stripe setup: domain", d, (e as Error).message);
          }
        }
      }
    } catch (e) {
      console.warn("stripe setup: domains", (e as Error).message);
    }
    try {
      const hooks = await s.webhookEndpoints.list({ limit: 100 });
      const mine = hooks.data.find((h) => h.url === HOOK_URL);
      if (!mine) {
        await s.webhookEndpoints.create({ url: HOOK_URL, enabled_events: [...EVENTS], description: "It Flew! orders" });
      } else if (!EVENTS.every((e) => mine.enabled_events.includes(e) || mine.enabled_events.includes("*"))) {
        await s.webhookEndpoints.update(mine.id, { enabled_events: [...new Set([...mine.enabled_events, ...EVENTS])] as Stripe.WebhookEndpointUpdateParams.EnabledEvent[] });
      }
    } catch (e) {
      console.warn("stripe setup: webhook", (e as Error).message);
    }
  })();
  return done;
}
