"use client";

import { useMemo, useState, useTransition } from "react";
import { MessageCircle, Search } from "lucide-react";
import { updateLeadStatusAction } from "@/lib/actions";
import type { Lead } from "@prisma/client";

type LeadRow = Lead & { assignedTo?: { name: string } | null };

const statuses = [
  "New",
  "Contacted",
  "Documents Pending",
  "Processing",
  "Submitted",
  "Completed",
  "Closed",
];

const statusPill: Record<string, string> = {
  New: "bg-gold-400/15 text-gold-300 ring-gold-400/40",
  Contacted: "bg-sky-400/10 text-sky-300 ring-sky-400/30",
  "Documents Pending": "bg-amber-400/10 text-amber-300 ring-amber-400/30",
  Processing: "bg-violet-400/10 text-violet-300 ring-violet-400/30",
  Submitted: "bg-blue-400/10 text-blue-300 ring-blue-400/30",
  Completed: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
  Closed: "bg-slate-400/10 text-slate-300 ring-slate-400/30",
};

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [rows, setRows] = useState(leads);
  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((l) => {
      if (statusFilter !== "All" && l.status !== statusFilter) return false;
      if (!q) return true;
      return [l.leadNo, l.name, l.mobile, l.email, l.service, l.destination]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, statusFilter, query]);

  const changeStatus = (lead: LeadRow, status: string) => {
    const previous = rows;
    setRows((r) => r.map((x) => (x.id === lead.id ? { ...x, status } : x)));
    startTransition(async () => {
      try {
        await updateLeadStatusAction(lead.id, status);
      } catch {
        setRows(previous);
      }
    });
  };

  const waHref = (l: LeadRow) => {
    const digits = (l.mobile ?? "").replace(/\D/g, "");
    if (digits.length < 10) return null;
    return `https://wa.me/${digits}?text=${encodeURIComponent(
      `Hello ${l.name}, this is Nadeem Tour & Travels. Thank you for your enquiry (${l.leadNo}) regarding ${l.service}.`
    )}`;
  };

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const l of rows) m.set(l.status, (m.get(l.status) ?? 0) + 1);
    return m;
  }, [rows]);

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="card-glass flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter("All")}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-bold transition-colors ${
              statusFilter === "All"
                ? "bg-gradient-to-r from-gold-300 to-gold-500 text-navy-950"
                : "border border-white/10 text-slate-300 hover:bg-white/5"
            }`}
          >
            All ({rows.length})
          </button>
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-bold transition-colors ${
                statusFilter === s
                  ? "bg-gradient-to-r from-gold-300 to-gold-500 text-navy-950"
                  : "border border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              {s} ({counts.get(s) ?? 0})
            </button>
          ))}
        </div>
        <div className="relative lg:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, lead no, mobile…"
            className="input-base pl-10 !py-2.5 !text-[13px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card-glass overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-5 py-3.5">Lead No</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Service</th>
                <th className="px-5 py-3.5">Destination</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Source</th>
                <th className="px-5 py-3.5">Received</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => {
                const wa = waHref(l);
                return (
                  <tr key={l.id} className="border-b border-white/5 align-top transition-colors last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-bold text-gold-300">{l.leadNo}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{l.name}</p>
                      <p className="text-[12px] text-slate-500">
                        {l.mobile ?? "—"}
                        {l.email ? ` • ${l.email}` : ""}
                      </p>
                      {l.assignedTo && (
                        <p className="mt-0.5 text-[11px] text-gold-400/80">→ {l.assignedTo.name}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {l.service}
                      {l.message && (
                        <p className="mt-1 max-w-[240px] truncate text-[11px] text-slate-500" title={l.message}>
                          {l.message}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {l.destination || "—"}
                      {l.travelDate && (
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {l.travelDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={l.status}
                        disabled={pending}
                        onChange={(e) => changeStatus(l, e.target.value)}
                        className={`rounded-full border-0 px-2.5 py-1 text-[11px] font-extrabold ring-1 outline-none disabled:opacity-50 ${statusPill[l.status] ?? statusPill.New} bg-transparent [&>option]:bg-navy-900`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-[12px] text-slate-500">{l.source}</td>
                    <td className="px-5 py-4 text-[12px] text-slate-400">
                      {l.createdAt.toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {wa ? (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp this customer"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#4ade80] ring-1 ring-[#25D366]/30 transition-colors hover:bg-[#25D366]/25"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-14 text-center text-slate-500">
                    {query || statusFilter !== "All"
                      ? "No leads match your filter."
                      : "No leads yet — they will appear here as enquiries come in."}
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
