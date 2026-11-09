"use server";

import { admin } from "@/lib/supabase/admin";

export type SupportState = { ok: boolean; message: string } | null;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function sendSupport(_: SupportState, fd: FormData): Promise<SupportState> {
  if (String(fd.get("company") ?? "")) return { ok: true, message: "Thanks, we got it." }; // honeypot
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const message = String(fd.get("message") ?? "").trim();
  const topic = String(fd.get("topic") ?? "").trim().slice(0, 60) || null;
  const page = String(fd.get("page") ?? "").slice(0, 300) || null;
  if (!EMAIL.test(email) || email.length > 254) return { ok: false, message: "Add an email so we can reply." };
  if (message.length < 2) return { ok: false, message: "Write a short message first." };
  try {
    const { error } = await admin().from("support_messages").insert({ email, message: message.slice(0, 4000), topic, page });
    if (error) throw error;
  } catch {
    return { ok: false, message: "Couldn't send right now. Email support@itflew.com instead." };
  }
  return { ok: true, message: "Got it. We'll reply to " + email + " as soon as we can." };
}
