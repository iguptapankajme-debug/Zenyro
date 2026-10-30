"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="grid gap-4">
      <label htmlFor="admin-password" className="text-[0.85rem] font-medium">Password</label>
      <input id="admin-password" name="password" type="password" autoComplete="current-password" required className="rounded-xl border border-line-2 bg-ink px-4 py-3 focus:border-ember focus:outline-none" aria-describedby={state.error ? "admin-error" : undefined} />
      {state.error && <p id="admin-error" role="alert" className="text-[0.85rem] text-red-300">{state.error}</p>}
      <button type="submit" disabled={pending} className="h-12 rounded-full bg-ember font-medium text-ember-ink disabled:opacity-60">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
