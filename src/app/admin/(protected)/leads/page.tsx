import type { Metadata } from "next";
import LeadsTable from "@/components/admin/leads-table";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Leads" };

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { assignedTo: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Leads</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">
          All Enquiries
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Every form submission on the website lands here as a lead — update the status as your
          team works through each case.
        </p>
      </div>
      <LeadsTable leads={leads} />
    </div>
  );
}
