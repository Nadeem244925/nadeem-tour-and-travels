import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Eye, Pencil, EyeOff, Luggage } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toggleDestinationAction } from "@/lib/content-actions";

export const metadata: Metadata = { title: "Destinations" };

export default async function AdminDestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { packages: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-white">Destinations</h1>
          <p className="mt-1 text-sm text-slate-400">
            {destinations.length} destinations — each gets its own SEO landing page.
          </p>
        </div>
        <Link href="/admin/destinations/new" className="btn-gold !py-2.5 !text-[13px]">
          <Plus className="h-4 w-4" /> New Destination
        </Link>
      </div>

      <div className="card-glass overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-5 py-3.5">Order</th>
                <th className="px-5 py-3.5">Destination</th>
                <th className="px-5 py-3.5">Slug</th>
                <th className="px-5 py-3.5">Packages</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((d) => (
                <tr key={d.id} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-slate-500">{d.order}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{d.name}</p>
                    <p className="max-w-[320px] truncate text-[12px] text-slate-500">{d.description}</p>
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-400">{d.slug}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-300">
                      <Luggage className="h-3.5 w-3.5 text-gold-400" /> {d._count.packages}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <form action={toggleDestinationAction}>
                      <input type="hidden" name="id" value={d.id} />
                      <input type="hidden" name="isActive" value={String(!d.isActive)} />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold ring-1 transition-colors ${
                          d.isActive
                            ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30 hover:bg-emerald-400/20"
                            : "bg-slate-400/10 text-slate-400 ring-slate-400/30 hover:bg-slate-400/20"
                        }`}
                      >
                        {d.isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {d.isActive ? "Live" : "Hidden"}
                      </button>
                    </form>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/destinations/${d.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[12px] font-bold text-slate-200 transition-colors hover:border-gold-400/50 hover:text-gold-200"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
