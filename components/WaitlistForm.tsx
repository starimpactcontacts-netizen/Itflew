"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

// Footer sign-up: underline input with an arrow submit.
export default function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, null);

  if (state?.ok) return <p className="fs-msg" role="status">{state.message}</p>;

  return (
    <form action={action} className="fs-form">
      <label htmlFor="email" className="sr-only">Email address</label>
      <input id="email" name="email" type="email" required placeholder="Email address *" autoComplete="email" />
      <button aria-label="Sign up" disabled={pending}>
        <svg viewBox="0 0 48 32" width="46" height="30" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M2 16h42M30 3c3 7 8 11 14 13-6 2-11 6-14 13" />
        </svg>
      </button>
      {state && !state.ok && <p className="fs-msg err" role="alert">{state.message}</p>}
    </form>
  );
}
