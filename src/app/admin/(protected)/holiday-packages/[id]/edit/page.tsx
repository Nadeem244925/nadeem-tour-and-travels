import { notFound } from "next/navigation";
import PackageForm from "@/components/admin/package-form";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Edit Holiday Package" };

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [pkg, destinations] = await Promise.all([
    prisma.holidayPackage.findUnique({ where: { id } }),
    prisma.destination.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!pkg) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">Edit Holiday Package</h1>
        <p className="mt-1 text-sm text-slate-400">Editing “{pkg.name}”.</p>
      </div>
      <div className="card-glass p-6 sm:p-8">
        <PackageForm package={pkg} isNew={false} destinations={destinations} />
      </div>
    </div>
  );
}
