import { ITR } from "./products";

export const MAX_QTY = 10;
export const WELCOME_DISCOUNT = 0.1;
export const SHIPPING_CENTS = 700; // flat $7 standard shipping per order

// All amounts in cents, computed on the server only.
export function priceFor(qty: number, welcome: boolean) {
  const q = Math.max(1, Math.min(MAX_QTY, Math.floor(qty) || 1));
  const subtotal = Math.round(ITR.price * 100) * q;
  const discount = welcome ? Math.round(subtotal * WELCOME_DISCOUNT) : 0;
  const shipping = SHIPPING_CENTS;
  return { qty: q, subtotal, discount, shipping, total: subtotal - discount + shipping };
}
