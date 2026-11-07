"use server";

import { createClient } from "@/lib/supabase/server";

export type TrackedOrder = {
  order_number: string;
  status: "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
  carrier: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  created_at: string;
  updated_at: string;
};

export type TrackState =
  | { kind: "found"; order: TrackedOrder }
  | { kind: "error"; message: string }
  | null;

export async function trackOrder(_: TrackState, formData: FormData): Promise<TrackState> {
  const orderNumber = String(formData.get("order") ?? "").trim().replace(/^#/, "");
  const email = String(formData.get("email") ?? "").trim();
  if (!orderNumber || orderNumber.length > 64 || !email || email.length > 254) {
    return { kind: "error", message: "Enter your order number and the email you ordered with." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("track_order", { p_order_number: orderNumber, p_email: email });
  if (error) return { kind: "error", message: "Couldn't check right now. Try again in a minute." };

  const order = (data as TrackedOrder[] | null)?.[0];
  if (!order) {
    return { kind: "error", message: "We couldn't find that order. Check the number and email from your confirmation." };
  }
  return { kind: "found", order };
}
