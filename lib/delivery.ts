// Standard shipping: 7–12 business days from order (fulfilled in 24–48h).
export const DELIVERY_MIN_DAYS = 7;
export const DELIVERY_MAX_DAYS = 12;

export function addBusinessDays(from: Date, n: number) {
  const d = new Date(from);
  while (n > 0) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0 && w !== 6) n--;
  }
  return d;
}

export const fmtDay = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export function deliveryWindow(now = new Date()) {
  return { from: addBusinessDays(now, DELIVERY_MIN_DAYS), to: addBusinessDays(now, DELIVERY_MAX_DAYS) };
}
