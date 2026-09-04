import Link from "next/link";
import type { User } from "@prisma/client";
import { LayoutDashboard, Inbox, Landmark, Compass, Luggage, ExternalLink } from "lucide-react";
import BrandLogo from "@/components/brand-logo";
import SignOutButton from "@/components/admin/signout-button";

export default function AdminShell({ user, children }: { user: User; children: React.ReactNode }) {
  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Leads", icon: Inbox },
    { href: "/admin/visa-services", label: "Visas", icon: Landmark },
    { href: "/admin/destinations", label: "Destinations", icon: Compass },
    { href: "/admin/holiday-packages", label: "Packages", icon: Luggage },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="h-9 w-9 shrink-0" />
            <div className="leading-tight">
              <p className="text-[12px] font-extrabold tracking-[0.14em] text-white">NADEEM TOUR</p>
              <p className="text-[9px] font-bold tracking-[0.32em] text-gold-400">ADMIN PANEL</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 sm:flex" aria-label="Admin">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <n.icon className="h-4 w-4 text-gold-400" /> {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-slate-400 hover:text-gold-300 md:flex"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </Link>
            <div className="hidden text-right sm:block">
              <p className="text-[12px] font-bold text-white">{user.name}</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-400">
                {user.role}
              </p>
            </div>
            <SignOutButton />
          </div>
        </div>
        {/* Mobile nav */}
        <nav className="flex items-center gap-1 border-t border-white/5 px-3 py-2 sm:hidden" aria-label="Admin mobile">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <n.icon className="h-4 w-4 text-gold-400" /> {n.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl px-5 py-8">{children}</main>
    </div>
  );
}
