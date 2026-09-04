"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import BrandLogo from "@/components/brand-logo";
import { navLinks, waGeneral, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy-950/90 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" onClick={close} className="group flex min-w-0 items-center gap-2.5" aria-label="Nadeem Tour & Travels — home">
          <BrandLogo className="h-10 w-10 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-extrabold tracking-[0.12em] text-white">
              NADEEM TOUR
            </span>
            <span className="block text-[10px] font-bold tracking-[0.34em] text-gold-400">
              & TRAVELS
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 xl:gap-7 lg:flex" aria-label="Main">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[12.5px] font-semibold tracking-wide transition-colors ${
                  active ? "text-gold-300" : "text-slate-200 hover:text-gold-200"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="hidden items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-[12.5px] font-bold text-gold-200 transition-all hover:bg-gold-400/20 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-navy-950/98 backdrop-blur-xl lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-6" aria-label="Mobile">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
                    active
                      ? "bg-gold-400/10 text-gold-300"
                      : "text-slate-100 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={waGeneral}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="btn-whatsapp col-span-2"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp {site.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
