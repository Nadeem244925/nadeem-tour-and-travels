import type { Destination, HolidayPackage } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import { upsertPackageAction } from "@/lib/content-actions";
import { CheckboxRow, Field, Select, SubmitBar, TextArea, TextInput } from "@/components/admin/form-fields";

export default function PackageForm({
  package: pkg,
  destinations,
  isNew,
}: {
  package?: HolidayPackage;
  destinations: Destination[];
  isNew: boolean;
}) {
  return (
    <form action={upsertPackageAction} className="grid gap-5 lg:grid-cols-2">
      {!isNew && pkg && <input type="hidden" name="id" value={pkg.id} />}

      <Field label="Package name *" className="lg:col-span-2">
        <TextInput name="name" required defaultValue={pkg?.name} placeholder="Dubai Classic" />
      </Field>

      <Field label="Destination">
        <Select
          name="destinationId"
          defaultValue={pkg?.destinationId ?? undefined}
          options={destinations.map((d) => ({ value: d.id, label: d.name }))}
        />
      </Field>

      <Field label="Slug" hint={isNew ? "Leave empty to auto-generate from the name." : "Changing this changes the public URL."}>
        <TextInput name="slug" defaultValue={pkg?.slug} placeholder="dubai-classic" />
      </Field>

      <Field label="Duration label" hint="e.g. 3N / 4D, 6N / 7D or Tailor-made.">
        <TextInput name="durationLabel" defaultValue={pkg?.durationLabel ?? ""} placeholder="3N / 4D" />
      </Field>

      <Field label="Price from" hint="Display label, e.g. ₹32,999 or On request.">
        <TextInput name="priceFrom" defaultValue={pkg?.priceFrom ?? ""} placeholder="₹32,999" />
      </Field>

      <Field label="Hero image URL *" className="lg:col-span-2">
        <TextInput name="image" required defaultValue={pkg?.image ?? ""} placeholder="https://…" />
      </Field>

      <Field label="What's included (one per line)" className="lg:col-span-2">
        <TextArea name="includes" rows={7} defaultValue={pkg?.includes ?? ""} placeholder={"Hotel stay\nTransfers\nCity tour & sightseeing\nVisa assistance"} />
      </Field>

      <Field label="Display order" hint="Lower numbers appear first.">
        <TextInput name="order" type="number" defaultValue={String(pkg?.order ?? 0)} />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
        <CheckboxRow name="popular" checked={pkg?.popular ?? false} label="Mark as popular" hint="Popular packages show on the homepage." />
        <CheckboxRow name="isActive" checked={pkg ? pkg.isActive : true} label="Live on website" hint="Untick to hide this package." />
      </div>

      {!isNew && pkg && (
        <a
          href={`/holiday-packages/${pkg.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-gold-300 hover:bg-white/[0.08] lg:col-span-2"
        >
          <ExternalLink className="h-4 w-4" /> View public page
        </a>
      )}

      <div className="lg:col-span-2">
        <SubmitBar backHref="/admin/holiday-packages" submitLabel={isNew ? "Create package" : "Save changes"} />
      </div>
    </form>
  );
}
