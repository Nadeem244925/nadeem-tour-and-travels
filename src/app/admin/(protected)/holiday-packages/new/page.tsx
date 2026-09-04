import PackageForm from "@/components/admin/package-form";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "New Holiday Package" };

export default async function NewPackagePage() {
  const destinations = await prisma.destination.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">New Holiday Package</h1>
        <p className="mt-1 text-sm text-slate-400">It will appear at /holiday-packages/&lt;slug&gt;.</p>
      </div>
      <div className="card-glass p-6 sm:p-8">
        <PackageForm isNew destinations={destinations} />
      </div>
    </div>
  );
}
