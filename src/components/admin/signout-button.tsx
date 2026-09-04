"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions";

export default function SignOutButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await logoutAction();
          router.push("/admin/login");
        })
      }
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-[12px] font-bold text-slate-200 transition-colors hover:border-red-400/50 hover:text-red-300 disabled:opacity-50"
    >
      <LogOut className="h-3.5 w-3.5" />
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
