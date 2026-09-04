"use client";

import { useActionState } from "react";
import { Loader2, Lock, LogIn, Mail } from "lucide-react";
import { loginAction } from "@/lib/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      {state?.error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input id="email" name="email" type="email" required autoComplete="email" className="input-base pl-10" placeholder="admin@nadeemtours.in" />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="field-label">Password</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input id="password" name="password" type="password" required autoComplete="current-password" className="input-base pl-10" placeholder="••••••••" />
        </div>
      </div>
      <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" /> Sign In
          </>
        )}
      </button>
    </form>
  );
}
