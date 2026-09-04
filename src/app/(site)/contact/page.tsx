import { Phone, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import Reveal from "@/components/reveal";
import EnquiryForm from "@/components/enquiry-form";
import { site, waGeneral } from "@/lib/site";
import { getActiveVisaServiceNames, getDestinationNames } from "@/lib/site-data";

export const revalidate = 300;

export const metadata = {
  title: "Contact Us",
};

export default async function ContactPage() {
  const [visaNames, destinationNames] = await Promise.all([
    getActiveVisaServiceNames(),
    getDestinationNames(),
  ]);

  const serviceOptions = [
    ...visaNames,
    "Flight Booking",
    "Hotel Booking",
    "Holiday Package",
    "Umrah Package",
    "General Enquiry",
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 420px at 85% -5%, rgba(217,186,104,0.12), transparent 60%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">Contact</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Plan Your <span className="gold-text italic">Next Trip</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              Enquiry form, WhatsApp, phone or email — whichever suits you best.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20">
        {/* Contact channels */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: MessageCircle,
              t: "WhatsApp",
              v: site.phoneDisplay,
              href: waGeneral,
              label: "Chat Now",
              external: true,
            },
            {
              icon: Phone,
              t: "Call Now",
              v: site.phoneDisplay,
              href: `tel:${site.phoneRaw}`,
              label: "Call",
            },
            {
              icon: Mail,
              t: "Email",
              v: site.email,
              href: `mailto:${site.email}`,
              label: "Send Email",
            },
            {
              icon: Clock,
              t: "Working Hours",
              v: "Mon – Sat · 10:00 – 19:00 IST",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.05}>
              <div className="card-glass-hover flex h-full flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300/25 to-gold-600/10 text-gold-300 ring-1 ring-gold-400/25">
                  <c.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-sm font-extrabold uppercase tracking-widest text-white">
                  {c.t}
                </h2>
                <p className="mt-1.5 text-sm break-words text-slate-400">{c.v}</p>
                {c.href && (
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="mt-auto pt-4 text-[13px] font-bold text-gold-300 hover:text-gold-200"
                  >
                    {c.label} →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Form + info */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="glass-form">
              <h2 className="font-display text-2xl font-semibold text-white">Send an Enquiry</h2>
              <p className="mt-1.5 mb-6 text-[13px] text-slate-400">
                We respond to every enquiry — usually within working hours.
              </p>
              <EnquiryForm
                service="General Enquiry"
                serviceOptions={serviceOptions}
                destinationOptions={destinationNames}
                source="Contact Page"
                submitLabel="Send Enquiry"
              />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.05}>
              <div className="card-glass p-6">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
                  How it works
                </h3>
                <ol className="mt-4 space-y-3">
                  {[
                    "Send your enquiry (or WhatsApp us directly).",
                    "We review and call/WhatsApp you to understand the requirement.",
                    "You receive a clear plan — documents, process, timeline and fees.",
                    "We assist at every step until you travel.",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-400/15 font-display text-xs font-bold text-gold-300 ring-1 ring-gold-400/30">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-glass flex items-start gap-4 p-6">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Based in India</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                    Serving travellers across India and worldwide — remotely, on WhatsApp and over
                    the phone.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
