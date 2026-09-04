import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/brand-logo";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false } };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-slate-400 transition-colors hover:text-gold-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>
        <div className="glass-form">
          <div className="text-center">
            <BrandLogo className="mx-auto h-16 w-16" />
            <h1 className="mt-5 font-display text-3xl font-semibold text-white">
              Nadeem Admin
            </h1>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-400">
              <ShieldCheck className="h-3.5 w-3.5" /> Staff Only
            </p>
          </div>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-500">
          Authorised staff only. Session persists for 7 days.
        </p>
      </div>
    </main>
  );
}
