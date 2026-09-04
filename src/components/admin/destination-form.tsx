import type { Destination } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import { upsertDestinationAction } from "@/lib/content-actions";
import { CheckboxRow, Field, SubmitBar, TextArea, TextInput } from "@/components/admin/form-fields";

export default function DestinationForm({
  destination,
  isNew,
}: {
  destination?: Destination;
  isNew: boolean;
}) {
  return (
    <form action={upsertDestinationAction} className="grid gap-5 lg:grid-cols-2">
      {!isNew && destination && <input type="hidden" name="id" value={destination.id} />}

      <Field label="Destination name *">
        <TextInput name="name" required defaultValue={destination?.name} placeholder="Dubai" />
      </Field>

      <Field label="Country / region" hint="Optional — hidden when it matches the name.">
        <TextInput name="country" defaultValue={destination?.country ?? ""} placeholder="United Arab Emirates" />
      </Field>

      <Field label="Slug" hint={isNew ? "Leave empty to auto-generate from the name." : "Changing this changes the public URL."}>
        <TextInput name="slug" defaultValue={destination?.slug} placeholder="dubai" />
      </Field>

      <Field label="Hero image URL *" hint="Unsplash or your CDN.">
        <TextInput name="image" required defaultValue={destination?.image ?? ""} placeholder="https://…" />
      </Field>

      <Field label="Short description" className="lg:col-span-2" hint="One short paragraph shown on cards and the page.">
        <TextArea name="description" rows={4} defaultValue={destination?.description ?? ""} />
      </Field>

      <Field label="Display order" hint="Lower numbers appear first.">
        <TextInput name="order" type="number" defaultValue={String(destination?.order ?? 0)} />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
        <CheckboxRow
          name="isActive"
          checked={destination ? destination.isActive : true}
          label="Live on website"
          hint="Untick to remove from the destinations grid."
        />
        {!isNew && destination && (
          <a
            href={`/destinations/${destination.slug}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-gold-300 hover:bg-white/[0.08]"
          >
            <ExternalLink className="h-4 w-4" /> View public page
          </a>
        )}
      </div>

      <div className="lg:col-span-2">
        <SubmitBar backHref="/admin/destinations" submitLabel={isNew ? "Create destination" : "Save changes"} />
      </div>
    </form>
  );
}
