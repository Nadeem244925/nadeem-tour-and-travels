import { notFound } from "next/navigation";
import VisaServiceForm from "@/components/admin/visa-service-form";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit Visa Service" };

export default async function EditVisaServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.visaService.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">Edit Visa Service</h1>
        <p className="mt-1 text-sm text-slate-400">Editing “{service.shortName}”.</p>
      </div>
      <div className="card-glass p-6 sm:p-8">
        <VisaServiceForm service={service} isNew={false} />
      </div>
    </div>
  );
}
