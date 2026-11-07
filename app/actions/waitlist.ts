"use server";

import { createClient } from "@/lib/supabase/server";

export type WaitlistState = { ok: boolean; message: string } | null;

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function joinWaitlist(_: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return { ok: false, message: "That email doesn't look right." };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("waitlist").insert({ email });
  // 23505 = already on the list; treat as success.
  if (error && error.code !== "23505") {
    return { ok: false, message: "Something went wrong. Try again." };
  }
  return { ok: true, message: "You're on the list. Watch your inbox." };
}
