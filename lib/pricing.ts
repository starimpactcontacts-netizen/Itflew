import { ITR } from "./products";

export const MAX_QTY = 10;
export const WELCOME_DISCOUNT = 0.1;

// All amounts in cents, computed on the server only.
export function priceFor(qty: number, welcome: boolean) {
  const q = Math.max(1, Math.min(MAX_QTY, Math.floor(qty) || 1));
  const subtotal = Math.round(ITR.price * 100) * q;
  const discount = welcome ? Math.round(subtotal * WELCOME_DISCOUNT) : 0;
  const shipping = 0;
  return { qty: q, subtotal, discount, shipping, total: subtotal - discount + shipping };
}
