"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

export default function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, null);

  if (state?.ok) return <p className="form-msg ok">{state.message}</p>;

  return (
    <form action={action} className="list-form">
      <label htmlFor="email" className="sr-only">Email</label>
      <input id="email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
      <button className="btn btn-cream" disabled={pending}>
        {pending ? "Sending…" : "Notify me"}
      </button>
      {state && !state.ok && <p className="form-msg err">{state.message}</p>}
    </form>
  );
}
