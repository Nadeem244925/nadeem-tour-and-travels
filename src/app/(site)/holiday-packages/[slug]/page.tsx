import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, MessageCircle, Phone, MapPin, CalendarDays, Wallet } from "lucide-react";
import Reveal from "@/components/reveal";
import EnquiryForm from "@/components/enquiry-form";
import { splitLines, waLink, site } from "@/lib/site";
import { getPackage, getPackageSlugs } from "@/lib/site-data";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPackageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  return {
    title: pkg ? `${pkg.name} — ${pkg.durationLabel ?? "Holiday Package"}` : "Holiday Package",
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg || !pkg.isActive) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-14">
        {pkg.image && (
          <div className="absolute inset-0">
            <Image src={pkg.image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/92 to-navy-950" />
          </div>
        )}
        <div className="container-x relative">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-[12px] text-slate-400" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gold-300">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/holiday-packages" className="hover:text-gold-300">Holiday Packages</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gold-300">{pkg.name}</span>
            </nav>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {pkg.durationLabel && (
                <span className="chip"><CalendarDays className="h-3.5 w-3.5 text-gold-400" /> {pkg.durationLabel}</span>
              )}
              {pkg.destination?.name && (
                <span className="chip"><MapPin className="h-3.5 w-3.5 text-gold-400" /> {pkg.destination.name}</span>
              )}
              {pkg.popular && (
                <span className="chip"><span className="text-gold-300">★</span> Popular</span>
              )}
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.07] text-white sm:text-5xl">
              {pkg.name}
            </h1>
            <div className="mt-5 flex items-center gap-3">
              <Wallet className="h-5 w-5 text-gold-400" />
              <p className="text-sm text-slate-300">
                From <span className="font-display text-2xl font-bold text-gold-300">{pkg.priceFrom}</span>
                <span className="text-xs text-slate-500"> / person (indicative)</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal>
              <div className="card-glass p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-white">What&apos;s included</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {splitLines(pkg.includes).map((inc) => (
                    <div key={inc} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                      <span className="text-sm text-slate-200">{inc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl border border-gold-400/25 bg-gold-400/[0.06] p-5">
                  <p className="text-[13px] leading-relaxed text-slate-300">
                    <strong className="text-gold-200">Prices are indicative</strong> and depend on
                    travel dates, hotel category and availability. Send us your dates for an exact,
                    personalised quotation.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass-form mt-8">
                <h2 className="font-display text-2xl font-semibold text-white">Get an Exact Quote</h2>
                <p className="mt-1.5 mb-6 text-[13px] text-slate-400">
                  Tell us your travel dates and number of travellers.
                </p>
                <EnquiryForm
                  service="Holiday Package"
                  destination={pkg.destination?.name ?? pkg.name}
                  submitLabel="Request Quote"
                />
              </div>
            </Reveal>
          </div>

          <aside className="lg:pt-2">
            <div className="space-y-6 lg:sticky lg:top-24">
              <Reveal>
                <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/12 to-transparent p-6">
                  <h3 className="font-display text-lg font-semibold text-white">Book this package</h3>
                  <p className="mt-1.5 text-[13px] text-slate-300">
                    Fastest response on WhatsApp.
                  </p>
                  <a
                    href={waLink(`Hello Nadeem Tour & Travels, I want a quote for the ${pkg.name} package (${pkg.durationLabel ?? ""}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-4 w-full"
                  >
                    <MessageCircle className="h-4 w-4" /> Get Quote on WhatsApp
                  </a>
                  <a href={`tel:${site.phoneRaw}`} className="btn-ghost mt-3 w-full">
                    <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="card-glass p-6 text-sm leading-relaxed text-slate-400">
                  <p>
                    Prefer a different duration, hotel star or budget? Every package can be
                    customised — your holiday, your way.
                  </p>
                  <Link href="/contact" className="mt-4 inline-block font-bold text-gold-300 hover:text-gold-200">
                    Request customisation →
                  </Link>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
