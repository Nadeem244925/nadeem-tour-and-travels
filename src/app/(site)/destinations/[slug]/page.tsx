import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, Landmark, MessageCircle, Plane } from "lucide-react";
import Reveal from "@/components/reveal";
import EnquiryForm from "@/components/enquiry-form";
import VisaDescription from "@/components/visa-description";
import { waLink } from "@/lib/site";
import { getDestination, getDestinationSlugs, getVisaService } from "@/lib/site-data";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = await getDestination(slug);
  return {
    title: dest ? `Travel to ${dest.name} — Visa, Flights, Hotels & Packages` : "Destination",
    description: dest?.description ?? undefined,
  };
}

/** Map a destination slug to its most relevant visa service. */
const visaForDestination: Record<string, string> = {
  dubai: "dubai",
  "abu-dhabi": "dubai",
  "saudi-arabia": "saudi-arabia",
  turkey: "turkey",
  france: "schengen",
  switzerland: "schengen",
  italy: "schengen",
  usa: "usa",
  uk: "uk",
  canada: "canada",
};

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = await getDestination(slug);
  if (!dest || !dest.isActive) notFound();

  const visaSlug = visaForDestination[slug];
  const visa = visaSlug ? await getVisaService(visaSlug) : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16">
        {dest.image && (
          <div className="absolute inset-0">
            <Image src={dest.image} alt={dest.name} fill priority sizes="100vw" className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/85 to-navy-950" />
          </div>
        )}
        <div className="container-x relative">
          <Reveal>
            <nav className="flex items-center gap-1.5 text-[12px] text-slate-400" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gold-300">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/destinations" className="hover:text-gold-300">Destinations</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gold-300">{dest.name}</span>
            </nav>
            <span className="eyebrow mt-6">Destination</span>
            <h1 className="mt-3 font-display text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
              {dest.name}
            </h1>
            {dest.country && dest.country !== dest.name && (
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">
                {dest.country}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal>
              <VisaDescription text={dest.description} />
            </Reveal>

            {visa && (
              <Reveal>
                <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gold-400/25 bg-gold-400/[0.06] p-5">
                  <Landmark className="mt-0.5 h-6 w-6 shrink-0 text-gold-300" />
                  <div>
                    <p className="text-sm font-bold text-white">
                      Travelling to {dest.name}? Visa assistance available.
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-300">
                      {visa.tagline}
                    </p>
                    <Link
                      href={`/visa-services/${visa.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-gold-300 hover:text-gold-200"
                    >
                      View {visa.shortName} assistance →
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

            {dest.packages.length > 0 && (
              <Reveal>
                <div className="mt-10">
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {dest.name} Packages
                  </h2>
                  <div className="mt-5 space-y-4">
                    {dest.packages.map((p) => (
                      <Link
                        key={p.id}
                        href={`/holiday-packages/${p.slug}`}
                        className="card-glass-hover flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
                      >
                        <div>
                          <p className="font-display text-lg font-semibold text-white">{p.name}</p>
                          <p className="mt-1 text-[13px] text-slate-400">
                            {p.durationLabel}
                            {p.includes
                              ? ` • ${p.includes.split("\n").slice(0, 3).join(" • ")}`
                              : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-extrabold text-gold-300">{p.priceFrom}</span>
                          <span className="btn-ghost !px-4 !py-2 !text-[12px]">Details</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Quote form */}
            <Reveal>
              <div className="glass-form mt-12">
                <h2 className="font-display text-2xl font-semibold text-white">
                  Plan Your {dest.name} Trip
                </h2>
                <p className="mt-1.5 mb-6 text-[13px] text-slate-400">
                  Visas, flights, hotels or a full package — tell us what you need.
                </p>
                <EnquiryForm
                  service="Holiday Package"
                  serviceOptions={[
                    "Holiday Package",
                    ...(visa ? [visa.name] : []),
                    "Flight Booking",
                    "Hotel Booking",
                    "General Enquiry",
                  ]}
                  destination={dest.name}
                  submitLabel="Submit Enquiry"
                />
              </div>
            </Reveal>
          </div>

          <aside className="lg:pt-2">
            <div className="space-y-6 lg:sticky lg:top-24">
              <Reveal>
                <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/12 to-transparent p-6">
                  <h3 className="font-display text-lg font-semibold text-white">
                    Ready for {dest.name}?
                  </h3>
                  <p className="mt-1.5 text-[13px] text-slate-300">
                    Get a personalised plan on WhatsApp.
                  </p>
                  <a
                    href={waLink(`Hello Nadeem Tour & Travels, I am planning a trip to ${dest.name}. Please assist.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp mt-4 w-full"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Now
                  </a>
                  <Link href="/flights" className="btn-ghost mt-3 w-full">
                    <Plane className="h-4 w-4" /> Flight to {dest.name}
                  </Link>
                </div>
              </Reveal>
              {visa && (
                <Reveal delay={0.05}>
                  <div className="card-glass p-6">
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
                      Key highlight
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {visa.features
                        ?.split("\n")
                        .filter(Boolean)
                        .slice(0, 6)
                        .map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {f.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
