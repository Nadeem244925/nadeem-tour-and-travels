import Reveal from "@/components/reveal";

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-3 ${alignCls}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-display max-w-3xl">{title}</h2>
      {sub && <p className="max-w-2xl text-base leading-relaxed text-slate-400">{sub}</p>}
      <span className={align === "center" ? "gold-divider" : "gold-divider ml-0 mr-auto"} />
    </Reveal>
  );
}
