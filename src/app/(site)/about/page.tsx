import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  Building2,
  Landmark,
  Globe2,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  MessagesSquare,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";

export const metadata = {
  title: "About Us",
};

const services = [
  { icon: Landmark, t: "Visa Assistance", d: "USA, Schengen, Dubai, Saudi Arabia, UK, Canada & more" },
  { icon: Plane, t: "International Travel", d: "Flights and end-to-end journey planning" },
  { icon: Building2, t: "Flight & Hotel Booking", d: "Confirmed bookings at the best rates" },
  { icon: Sparkles, t: "Holiday Planning", d: "Personalised itineraries for every kind of traveller" },
  { icon: MessagesSquare, t: "Personalized Assistance", d: "One-to-one guidance through every step" },
  { icon: HeartHandshake, t: "Customer Support", d: "Quick, honest answers on WhatsApp & phone" },
];

const why = [
  { icon: ShieldCheck, t: "Professional Assistance", d: "Experienced, accurate handling of your travel documents." },
  { icon: FileCheck2, t: "Transparent Process", d: "Clear process, honest timelines, no hidden surprises." },
  { icon: Sparkles, t: "Personalized Service", d: "Plans built around you — never one-size-fits-all." },
  { icon: Globe2, t: "International Destinations", d: "Hands-on support across the world's top destinations." },
  { icon: MessagesSquare, t: "Travel Support", d: "We stay reachable from enquiry to arrival." },
  { icon: HeartHandshake, t: "Customer-Focused Approach", d: "Your journey is our priority — your trust, our reputation." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-14">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 420px at 15% -5%, rgba(217,186,104,0.12), transparent 60%), radial-gradient(700px 400px at 100% 50%, rgba(25,48,79,0.65), transparent 65%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">About Us</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
              About <span className="gold-text italic">Nadeem Tour & Travels</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
              Your Journey. Our Expertise. — a travel and visa assistance company built on
              transparency, accuracy and care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="container-x pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop"
                alt="Traveller planning a journey"
                width={1200}
                height={900}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Trusted guidance for every journey
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-400">
              <p>
                International travel involves forms, documents, appointments and details that can
                overwhelm even seasoned travellers. Nadeem Tour &amp; Travels exists to take that
                load off your shoulders.
              </p>
              <p>
                From visa application and documentation assistance for the USA, Schengen Europe,
                Dubai, Saudi Arabia and beyond, to flights, hotels and complete holiday packages —
                we combine professional expertise with genuinely personal service.
              </p>
              <p>
                We are honest about what we can and cannot do: we assist, guide and prepare, while
                visa decisions remain with the relevant authorities. No guarantees, no gimmicks —
                just dependable work.
              </p>
            </div>
            <Link href="/contact" className="btn-gold mt-8">
              Talk to Us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services we offer */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="What We Do" title="Services Under One Roof" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 0.05}>
              <div className="card-glass-hover h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300/25 to-gold-600/10 text-gold-300 ring-1 ring-gold-400/25">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-1.5 text-[13px] text-slate-400">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-y border-white/5 bg-navy-900/50 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Why Choose Us" title="The Nadeem Difference" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.t} delay={(i % 3) * 0.05}>
                <div className="card-glass-hover flex h-full items-start gap-4 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/25">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">{w.t}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{w.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
