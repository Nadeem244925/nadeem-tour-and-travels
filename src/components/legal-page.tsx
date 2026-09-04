import Reveal from "@/components/reveal";

export type LegalBlock = {
  h?: string;
  p?: string[];
  list?: string[];
};

export default function LegalPage({
  title,
  intro,
  blocks,
}: {
  title: string;
  intro?: string;
  blocks: LegalBlock[];
}) {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-10">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(700px 380px at 80% -5%, rgba(217,186,104,0.1), transparent 60%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <span className="eyebrow">Legal</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl">
              {title}
            </h1>
            {intro && <p className="mt-4 max-w-2xl text-sm text-slate-400">{intro}</p>}
          </Reveal>
        </div>
      </section>
      <section className="container-x pb-20">
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            {blocks.map((b, i) => (
              <div key={i}>
                {b.h && (
                  <h2 className="mb-3 font-display text-xl font-semibold text-white sm:text-2xl">
                    {b.h}
                  </h2>
                )}
                {b.p?.map((p, j) => (
                  <p key={j} className="mb-3 text-[14.5px] leading-relaxed text-slate-300">
                    {p}
                  </p>
                ))}
                {b.list && (
                  <ul className="space-y-2">
                    {b.list.map((li, j) => (
                      <li key={j} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <p className="border-t border-white/10 pt-6 text-xs text-slate-500">
              Last updated: September 2026. Please contact us if you have questions about this
              policy.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
