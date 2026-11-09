import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

const first = (...names: string[]) => names.map((n) => process.env[n]).find((v) => v && v.trim())?.trim();

export const secretKey = () => first("STRIPE_SECRET_KEY", "STRIPE_SECRET", "STRIPE_API_KEY", "STRIPE_SK", "STRIPE_KEY");

export function stripe() {
  const key = secretKey();
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key);
  return client;
}

export const publishableKey = () =>
  first("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_PUBLISHABLE_KEY", "NEXT_PUBLIC_STRIPE_PUBLIC_KEY", "STRIPE_PUBLIC_KEY", "STRIPE_PK") ?? "";

export const webhookSecret = () => first("STRIPE_WEBHOOK_SECRET", "STRIPE_WEBHOOK_SIGNING_SECRET", "STRIPE_SIGNING_SECRET");
