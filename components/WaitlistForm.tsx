"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";

export default function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistState, FormData>(joinWaitlist, null);

  return (
    <section id="list" className="signup">
      <h2 className="signup-title">Stay in the know</h2>
      <p className="signup-sub">New drops, restocks and secrets, first.</p>
      {state?.ok ? (
        <p className="signup-msg" role="status">{state.message}</p>
      ) : (
        <form action={action} className="signup-form">
          <label htmlFor="email" className="sr-only">Email address</label>
          <input id="email" name="email" type="email" required placeholder="Email address" autoComplete="email" />
          <label className="signup-consent">
            <input type="checkbox" name="consent" required defaultChecked />
            <span>Sign me up to hear from It Flew!</span>
          </label>
          <button disabled={pending}>{pending ? "Signing up…" : "Sign up"}</button>
          {state && !state.ok && <p className="signup-msg err" role="alert">{state.message}</p>}
        </form>
      )}
    </section>
  );
}
