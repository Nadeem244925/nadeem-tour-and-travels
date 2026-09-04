import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="field-label">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{hint}</p>}
    </div>
  );
}

export function TextInput({
  name,
  defaultValue,
  placeholder,
  required,
  type = "text",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      defaultValue={defaultValue ?? ""}
      placeholder={placeholder}
      className="input-base"
    />
  );
}

export function TextArea({
  name,
  defaultValue,
  placeholder,
  rows = 6,
  required,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea
      name={name}
      rows={rows}
      required={required}
      defaultValue={defaultValue ?? ""}
      placeholder={placeholder}
      className="input-base resize-y font-mono !text-[12.5px] leading-relaxed"
    />
  );
}

export function Select({
  name,
  defaultValue,
  options,
  required,
}: {
  name: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}) {
  return (
    <select name={name} required={required} defaultValue={defaultValue ?? ""} className="input-base">
      {!required && <option value="">— None —</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-navy-900">
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function CheckboxRow({
  name,
  checked,
  label,
  hint,
}: {
  name: string;
  checked?: boolean;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked}
        className="mt-0.5 h-4 w-4 accent-[#d9ba68]"
      />
      <span>
        <span className="block text-sm font-semibold text-white">{label}</span>
        {hint && <span className="mt-0.5 block text-[11.5px] text-slate-500">{hint}</span>}
      </span>
    </label>
  );
}

export function SubmitBar({ backHref, submitLabel }: { backHref: string; submitLabel: string }) {
  return (
    <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
      <button type="submit" className="btn-gold">
        {submitLabel}
      </button>
      <a href={backHref} className="btn-ghost">
        Cancel
      </a>
    </div>
  );
}
