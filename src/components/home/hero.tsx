"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2400&auto=format&fit=crop",
    alt: "Dubai skyline at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1538488881038-e252a119ace7?q=80&w=2400&auto=format&fit=crop",
    alt: "New York City skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2400&auto=format&fit=crop",
    alt: "Resort pool over the ocean",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2400&auto=format&fit=crop",
    alt: "Europe travel landscape",
  },
];

const chips = ["Visa Assistance", "Flights", "Hotels", "Holiday Packages"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Slideshow background */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index && !reduce ? "scale-105" : "scale-100"} transition-transform duration-[9000ms] ease-out`}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/40" />

      {/* Content */}
      <div className="container-x relative z-10 pt-28 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-gold-400 to-transparent sm:w-16" />
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-gold-300 sm:text-xs">
              Nadeem Tour & Travels
            </p>
          </div>

          <h1 className="mt-6 font-display text-[42px] font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
            Explore The World
            <br />
            With <span className="gold-text italic">Confidence</span>
          </h1>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[12px] font-semibold tracking-wide text-slate-100 backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Professional assistance for visa applications, travel planning, flights, hotels and
            international journeys.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="/visa-services" className="btn-gold">
              Apply for Visa <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Get Travel Quote
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 text-[13px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-gold-400" />
            Transparent process — government & consular authorities make all visa decisions.
          </div>
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-24 left-5 z-10 flex gap-2 sm:left-8">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-gold-400" : "w-3 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <AnimatePresence>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-white/60" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
