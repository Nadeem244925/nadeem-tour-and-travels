import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import BrandLogo from "@/components/brand-logo";
import { site, waLink } from "@/lib/site";

const visaLinks = [
  { label: "USA", href: "/visa-services/usa" },
  { label: "Schengen", href: "/visa-services/schengen" },
  { label: "Dubai", href: "/visa-services/dubai" },
  { label: "Saudi Arabia", href: "/visa-services/saudi-arabia" },
  { label: "UK", href: "/visa-services/uk" },
  { label: "Canada", href: "/visa-services/canada" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Visa Disclaimer", href: "/visa-disclaimer" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900/60">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <BrandLogo className="h-10 w-10 shrink-0" />
              <span className="leading-tight">
                <span className="block text-[13px] font-extrabold tracking-[0.12em] text-white">
                  NADEEM TOUR
                </span>
                <span className="block text-[10px] font-bold tracking-[0.34em] text-gold-400">
                  & TRAVELS
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Visa assistance • Flights • Hotels • Holidays. Professional, personalised
              assistance for your international journeys.
            </p>
            <p className="mt-4 font-display text-lg italic text-gold-300">“{site.tagline}”</p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-400">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Visa Services", href: "/visa-services" },
                { label: "Flights", href: "/flights" },
                { label: "Hotels", href: "/hotels" },
                { label: "Holiday Packages", href: "/holiday-packages" },
                { label: "Destinations", href: "/destinations" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-300 transition-colors hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visas */}
          <nav aria-label="Visa services">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-400">
              Visas
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {visaLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-300 transition-colors hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold-400">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>
                <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-3 hover:text-gold-300">
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink("Hello Nadeem Tour & Travels, I have a travel enquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-gold-300"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-gold-400" /> WhatsApp Us
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-gold-300">
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>India — serving travellers worldwide</span>
              </li>
            </ul>

            <h3 className="mt-7 text-xs font-extrabold uppercase tracking-[0.24em] text-gold-400">
              Legal
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 transition-colors hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs leading-relaxed text-slate-500">
            <strong className="text-slate-300">Disclaimer:</strong> Nadeem Tour & Travels is a
            travel and visa assistance service provider. We do not represent any embassy,
            consulate, government authority or visa-issuing agency unless expressly stated. Visa
            approval, appointment availability and processing timelines are determined solely by
            the relevant authorities. Service fees charged by Nadeem Tour & Travels are separate
            from government visa fees and other third-party charges.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Visa Assistance • Flights • Hotels • Holiday Packages</p>
        </div>
      </div>
    </footer>
  );
}
