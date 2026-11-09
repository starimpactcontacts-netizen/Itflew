import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

const first = (...names: string[]) => names.map((n) => process.env[n]).find((v) => v && v.trim())?.trim();

const NAMES = ["STRIPE_SECRET_KEY", "STRIPE_SECRET", "STRIPE_API_KEY", "STRIPE_SK", "STRIPE_KEY", "STRIPE_RESTRICTED_KEY", "STRIPE_WEBHOOK_SECRET"];

// Any of these names may hold the API key; only values that look like a secret/restricted key count.
export const secretKey = () =>
  NAMES.map((n) => process.env[n]?.trim()).find((v) => v && /^(sk|rk)_(live|test)_/.test(v));

export function stripe() {
  const key = secretKey();
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key);
  return client;
}

export const publishableKey = () =>
  first("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_PUBLISHABLE_KEY", "NEXT_PUBLIC_STRIPE_PUBLIC_KEY", "STRIPE_PUBLIC_KEY", "STRIPE_PK") ?? "";

export const webhookSecret = () =>
  ["STRIPE_WEBHOOK_SECRET", "STRIPE_WEBHOOK_SIGNING_SECRET", "STRIPE_SIGNING_SECRET"]
    .map((n) => process.env[n]?.trim())
    .find((v) => v && v.startsWith("whsec_"));
