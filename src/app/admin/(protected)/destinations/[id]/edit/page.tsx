import { notFound } from "next/navigation";
import DestinationForm from "@/components/admin/destination-form";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit Destination" };

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = await prisma.destination.findUnique({ where: { id } });
  if (!destination) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">Edit Destination</h1>
        <p className="mt-1 text-sm text-slate-400">Editing “{destination.name}”.</p>
      </div>
      <div className="card-glass p-6 sm:p-8">
        <DestinationForm destination={destination} isNew={false} />
      </div>
    </div>
  );
}
