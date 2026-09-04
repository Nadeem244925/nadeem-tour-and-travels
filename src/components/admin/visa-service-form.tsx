import type { VisaService } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import { upsertVisaServiceAction } from "@/lib/content-actions";
import { VISA_CATEGORIES } from "@/lib/content";
import { CheckboxRow, Field, Select, SubmitBar, TextArea, TextInput } from "@/components/admin/form-fields";

export default function VisaServiceForm({
  service,
  isNew,
}: {
  service?: VisaService;
  isNew: boolean;
}) {
  return (
    <form action={upsertVisaServiceAction} className="grid gap-5 lg:grid-cols-2">
      {!isNew && service && <input type="hidden" name="id" value={service.id} />}

      <Field label="Full name *" className="lg:col-span-2">
        <TextInput name="name" required defaultValue={service?.name} placeholder="USA B1/B2 Visitor Visa Assistance" />
      </Field>

      <Field label="Menu label (short name) *" hint="Shown on cards & menus, e.g. “USA Visa”.">
        <TextInput name="shortName" required defaultValue={service?.shortName} placeholder="USA Visa" />
      </Field>

      <Field label="Category *">
        <Select
          name="category"
          required
          defaultValue={service?.category}
          options={VISA_CATEGORIES.map((c) => ({ value: c, label: c }))}
        />
      </Field>

      <Field label="Slug" hint={isNew ? "Leave empty to auto-generate from the name." : "Changing this changes the public URL — keep it unless necessary."}>
        <TextInput name="slug" defaultValue={service?.slug} placeholder="usa" />
      </Field>

      <Field label="Hero image URL *" hint="Unsplash or your CDN, e.g. https://images.unsplash.com/…">
        <TextInput name="image" required defaultValue={service?.image ?? ""} placeholder="https://…" />
      </Field>

      <Field label="Tagline" className="lg:col-span-2">
        <TextInput name="tagline" defaultValue={service?.tagline ?? ""} placeholder="One-line summary shown on cards." />
      </Field>

      <Field label="Description" className="lg:col-span-2" hint="Paragraphs separated by a blank line. Lines starting with “Important Disclaimer” render as a highlighted notice.">
        <TextArea name="description" rows={10} defaultValue={service?.description ?? ""} />
      </Field>

      <Field label="Features (one per line)" className="lg:col-span-2" hint="Shown as the checklist, e.g. DS-160 assistance">
        <TextArea name="features" rows={7} defaultValue={service?.features ?? ""} />
      </Field>

      <Field label="Options (one per line)" hint="Optional cards/chips — e.g. Schengen countries or Dubai visa durations.">
        <TextArea name="options" rows={5} defaultValue={service?.options ?? ""} />
      </Field>

      <Field label="Display order" hint="Lower numbers appear first.">
        <TextInput name="order" type="number" defaultValue={String(service?.order ?? 0)} />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
        <CheckboxRow
          name="isActive"
          checked={service ? service.isActive : true}
          label="Live on website"
          hint="Untick to hide this service from the public site."
        />
        {!isNew && service && (
          <a
            href={`/visa-services/${service.slug}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-gold-300 hover:bg-white/[0.08]"
          >
            <ExternalLink className="h-4 w-4" /> View public page
          </a>
        )}
      </div>

      <div className="lg:col-span-2">
        <SubmitBar backHref="/admin/visa-services" submitLabel={isNew ? "Create service" : "Save changes"} />
      </div>
    </form>
  );
}
