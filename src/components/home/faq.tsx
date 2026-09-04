"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";

const faqs = [
  {
    q: "Do you guarantee visa approval?",
    a: "No. Visa approval is decided solely by the relevant government and consular authorities. We provide application and documentation assistance to give your application the best possible chance.",
  },
  {
    q: "Can you help with the USA B1/B2 visa?",
    a: "Yes. We provide end-to-end assistance for B1/B2 applications — DS-160, document checklist, profile assessment, appointment-related assistance and interview preparation.",
  },
  {
    q: "Can you help with an earlier USA visa appointment?",
    a: "We can assist with the applicable appointment and expedited-request process, subject to official availability and eligibility. Appointments are scheduled by the consular authorities — nobody can guarantee a slot.",
  },
  {
    q: "Do you book international flights?",
    a: "Yes. Share your route and travel dates and we will arrange flight quotes and bookings for you, domestic and international.",
  },
  {
    q: "Do you provide hotel bookings?",
    a: "Yes. From city hotels to resorts, we book stays across destinations with rates that suit your budget.",
  },
  {
    q: "Do you provide customized holiday packages?",
    a: "Yes. Tell us your destination, dates and preferences and we will design a personalised itinerary — Dubai, Europe, Turkey, Thailand, Maldives and more.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, Answered"
        sub="Straight answers about visas, appointments and travel arrangements."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.04}>
              <div
                className={`card-glass overflow-hidden transition-colors ${
                  isOpen ? "border-gold-400/40 bg-white/[0.07]" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                >
                  <span className="text-[15px] font-semibold text-white">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gold-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400 sm:px-6">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
