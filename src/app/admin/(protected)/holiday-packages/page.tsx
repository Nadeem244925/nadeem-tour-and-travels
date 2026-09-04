import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Eye, Pencil, EyeOff, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { togglePackageAction } from "@/lib/content-actions";

export const metadata: Metadata = { title: "Holiday Packages" };

export default async function AdminPackagesPage() {
  const packages = await prisma.holidayPackage.findMany({
    orderBy: { order: "asc" },
    include: { destination: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-white">Holiday Packages</h1>
          <p className="mt-1 text-sm text-slate-400">{packages.length} packages.</p>
        </div>
        <Link href="/admin/holiday-packages/new" className="btn-gold !py-2.5 !text-[13px]">
          <Plus className="h-4 w-4" /> New Package
        </Link>
      </div>

      <div className="card-glass overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-5 py-3.5">Order</th>
                <th className="px-5 py-3.5">Package</th>
                <th className="px-5 py-3.5">Destination</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5">From</th>
                <th className="px-5 py-3.5">Popular</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((p) => (
                <tr key={p.id} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-slate-500">{p.order}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{p.name}</p>
                    <p className="max-w-[260px] truncate font-mono text-[11.5px] text-slate-500">{p.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-300">{p.destination?.name ?? "—"}</td>
                  <td className="px-5 py-4 text-slate-300">{p.durationLabel ?? "—"}</td>
                  <td className="px-5 py-4 font-bold text-gold-300">{p.priceFrom ?? "—"}</td>
                  <td className="px-5 py-4">
                    {p.popular ? <Star className="h-4 w-4 fill-gold-400 text-gold-400" /> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <form action={togglePackageAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="isActive" value={String(!p.isActive)} />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold ring-1 transition-colors ${
                          p.isActive
                            ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30 hover:bg-emerald-400/20"
                            : "bg-slate-400/10 text-slate-400 ring-slate-400/30 hover:bg-slate-400/20"
                        }`}
                      >
                        {p.isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {p.isActive ? "Live" : "Hidden"}
                      </button>
                    </form>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/holiday-packages/${p.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[12px] font-bold text-slate-200 transition-colors hover:border-gold-400/50 hover:text-gold-200"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    No packages yet — create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
