import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle, ShieldCheck, ChevronRight } from "lucide-react";
import Reveal from "@/components/reveal";
import EnquiryForm from "@/components/enquiry-form";
import VisaDescription from "@/components/visa-description";
import { splitLines, waLink, site } from "@/lib/site";
import { getActiveVisaServices, getVisaService, getVisaServiceSlugs } from "@/lib/site-data";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getVisaServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getVisaService(slug);
  if (!service) return { title: "Visa Service" };
  return {
    title: `${service.name} — Application & Documentation Assistance`,
    description: service.tagline ?? undefined,
  };
}

export default async function VisaServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getVisaService(slug);
  if (!service || !service.isActive) notFound();

  const siblings = (await getActiveVisaServices())
    .filter((s) => s.id !== service.id)
    .slice(0, 4)
    .map((s) => ({ slug: s.slug, shortName: s.shortName }));

  const waMsg = `Hello ${site.name}, I want to enquire about ${service.shortName} assistance.`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-14 sm:pb-16">
        {service.image && (
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/90 to-navy-950" />
          </div>
        )}
        <div className="container-x relative">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-[12px] text-slate-400" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gold-300">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/visa-services" className="hover:text-gold-300">Visa Services</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gold-300">{service.shortName}</span>
            </nav>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gold-400/40 bg-gold-400/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-200">
                {service.category}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.07] text-white sm:text-5xl">
              {service.name}
            </h1>
            {service.tagline && (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300">
                {service.tagline}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* Main */}
          <div>
            <Reveal>
              <VisaDescription text={service.description} />
            </Reveal>

            {service.options && (
              <Reveal>
                <div className="mt-10">
                  <h2 className="font-display text-2xl font-semibold text-white">
                    Popular Options
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {splitLines(service.options).map((o) => (
                      <span
                        key={o}
                        className="rounded-xl border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-slate-100"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Enquiry form */}
            <Reveal>
              <div className="glass-form mt-12">
                <h2 className="font-display text-2xl font-semibold text-white">
                  Get Started — Free Consultation
                </h2>
                <p className="mt-1.5 mb-6 text-[13px] text-slate-400">
                  Share your details and our team will guide you on the next steps.
                </p>
                <EnquiryForm
                  service={service.name}
                  destination={
                    ["schengen", "other-countries"].includes(service.slug)
                      ? undefined
                      : service.shortName.replace(" Visa", "")
                  }
                  destinationOptions={
                    service.slug === "schengen"
                      ? splitLines(service.options).slice(0, 10)
                      : undefined
                  }
                  submitLabel="Submit Enquiry"
                />
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:pt-2">
            <div className="space-y-6 lg:sticky lg:top-24">
              <Reveal>
                <div className="card-glass p-6">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
                    What we help with
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {splitLines(service.features).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/12 to-transparent p-6">
                  <h3 className="font-display text-lg font-semibold text-white">
                    Talk to us right now
                  </h3>
                  <p className="mt-1.5 text-[13px] text-slate-300">
                    Questions? Message us on WhatsApp for a quick reply.
                  </p>
                  <a
                    href={waLink(waMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-4 w-full"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Now
                  </a>
                  <a href={`tel:${site.phoneRaw}`} className="btn-ghost mt-3 w-full">
                    Call {site.phoneDisplay}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                  <p className="text-xs leading-relaxed text-slate-400">
                    Visa decisions and appointment availability are determined solely by the
                    relevant government/consular authorities. We never guarantee outcomes.
                  </p>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>

        {/* Siblings */}
        {siblings.length > 0 && (
          <Reveal>
            <div className="mt-16 border-t border-white/10 pt-10">
              <h2 className="font-display text-xl font-semibold text-white">Other Visa Services</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/visa-services/${s.slug}`}
                    className="card-glass-hover px-5 py-3 text-sm font-semibold text-slate-100"
                  >
                    {s.shortName}
                  </Link>
                ))}
                <Link href="/visa-services" className="btn-ghost !px-5 !py-3 !text-sm">
                  All Visa Services
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
