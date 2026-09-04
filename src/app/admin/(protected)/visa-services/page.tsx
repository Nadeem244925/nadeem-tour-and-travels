import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Eye, Pencil, EyeOff } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toggleVisaServiceAction } from "@/lib/content-actions";

export const metadata: Metadata = { title: "Visa Services" };

function ActiveToggle({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <form action={toggleVisaServiceAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="isActive" value={String(!isActive)} />
      <button
        type="submit"
        title={isActive ? "Click to hide from website" : "Click to publish"}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold ring-1 transition-colors ${
          isActive
            ? "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30 hover:bg-emerald-400/20"
            : "bg-slate-400/10 text-slate-400 ring-slate-400/30 hover:bg-slate-400/20"
        }`}
      >
        {isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        {isActive ? "Live" : "Hidden"}
      </button>
    </form>
  );
}

export default async function AdminVisaServicesPage() {
  const services = await prisma.visaService.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-white">Visa Services</h1>
          <p className="mt-1 text-sm text-slate-400">
            {services.length} services — changes are reflected on the public pages instantly.
          </p>
        </div>
        <Link href="/admin/visa-services/new" className="btn-gold !py-2.5 !text-[13px]">
          <Plus className="h-4 w-4" /> New Service
        </Link>
      </div>

      <div className="card-glass overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-5 py-3.5">Order</th>
                <th className="px-5 py-3.5">Service</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Slug</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-slate-500">{s.order}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-white">{s.shortName}</p>
                    <p className="max-w-[340px] truncate text-[12px] text-slate-500">{s.name}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gold-400/10 px-2.5 py-1 text-[10.5px] font-extrabold text-gold-300 ring-1 ring-gold-400/25">
                      {s.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[12px] text-slate-400">{s.slug}</td>
                  <td className="px-5 py-4">
                    <ActiveToggle id={s.id} isActive={s.isActive} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/visa-services/${s.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[12px] font-bold text-slate-200 transition-colors hover:border-gold-400/50 hover:text-gold-200"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No services yet — create your first one.
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
