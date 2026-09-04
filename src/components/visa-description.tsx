import { splitParagraphs } from "@/lib/site";

const NOTE_LABELS = ["Important Disclaimer", "Note:", "Disclaimer"];

export default function VisaDescription({ text }: { text?: string | null }) {
  const paragraphs = splitParagraphs(text);
  if (!paragraphs.length) return null;

  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-slate-300">
      {paragraphs.map((p, i) => {
        const label = NOTE_LABELS.find((l) => p.startsWith(l));
        if (label) {
          return (
            <div
              key={i}
              className="rounded-2xl border border-gold-400/25 bg-gold-400/[0.06] p-4"
            >
              <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-gold-300">
                {label.replace(":", "")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.slice(label.length).trim()}</p>
            </div>
          );
        }
        const isHeading = p.length < 70 && !p.endsWith(".") && !p.endsWith("?");
        return isHeading ? (
          <h3 key={i} className="pt-1 font-display text-xl font-semibold text-white">
            {p}
          </h3>
        ) : (
          <p key={i}>{p}</p>
        );
      })}
    </div>
  );
}
