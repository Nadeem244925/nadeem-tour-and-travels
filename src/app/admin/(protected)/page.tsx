import Link from "next/link";
import {
  Inbox,
  Landmark,
  Plane,
  Hotel,
  Luggage,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Clock,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const fmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function statusColor(s: string) {
  switch (s) {
    case "New":
      return "bg-gold-400/15 text-gold-300 ring-gold-400/40";
    case "Contacted":
      return "bg-sky-400/10 text-sky-300 ring-sky-400/30";
    case "Documents Pending":
      return "bg-amber-400/10 text-amber-300 ring-amber-400/30";
    case "Processing":
      return "bg-violet-400/10 text-violet-300 ring-violet-400/30";
    case "Submitted":
      return "bg-blue-400/10 text-blue-300 ring-blue-400/30";
    case "Completed":
      return "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30";
    default:
      return "bg-slate-400/10 text-slate-300 ring-slate-400/30";
  }
}

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [todayLeads, newLeads, recent, services, pipeline] = await Promise.all([
    prisma.lead.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.lead.count({ where: { status: "New" } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { assignedTo: { select: { name: true } } },
    }),
    prisma.visaService.findMany({ orderBy: { order: "asc" }, select: { slug: true, shortName: true } }),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  // Service counts (today)
  const serviceKeywords: Array<{ key: string; label: string; icon: typeof Landmark }> = [
    { key: "USA", label: "USA Visa", icon: Landmark },
    { key: "Schengen", label: "Schengen", icon: Landmark },
    { key: "Dubai", label: "Dubai Visa", icon: Landmark },
    { key: "Flight", label: "Flights", icon: Plane },
    { key: "Hotel", label: "Hotels", icon: Hotel },
    { key: "Holiday", label: "Holiday Packages", icon: Luggage },
    { key: "Saudi", label: "Saudi", icon: Landmark },
    { key: "General", label: "General", icon: Sparkles },
  ];
  const todayServiceRows = await prisma.lead.findMany({
    where: { createdAt: { gte: startOfDay } },
    select: { service: true },
  });
  const serviceCounts = serviceKeywords.map((s) => ({
    ...s,
    count: todayServiceRows.filter((r) => r.service.includes(s.key)).length,
  }));

  const statusOrder = ["New", "Contacted", "Documents Pending", "Processing", "Submitted", "Completed", "Closed"];
  const pipelineMap = new Map(pipeline.map((p) => [p.status, p._count._all]));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">
            Dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-white">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
        </div>
        <p className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="h-4 w-4 text-gold-400" />
          {fmt.format(new Date())}
        </p>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-glass p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              New Leads Today
            </p>
            <Inbox className="h-4 w-4 text-gold-400" />
          </div>
          <p className="stat-num mt-2 gold-text">{todayLeads}</p>
          <p className="mt-1 text-[12px] text-slate-500">received since midnight</p>
        </div>
        <div className="card-glass p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Open (New)
            </p>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="stat-num mt-2 text-emerald-300">{newLeads}</p>
          <p className="mt-1 text-[12px] text-slate-500">awaiting first contact</p>
        </div>
        <div className="card-glass p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Visa Services
            </p>
            <Landmark className="h-4 w-4 text-gold-400" />
          </div>
          <p className="stat-num mt-2 text-white">{services.length}</p>
          <p className="mt-1 text-[12px] text-slate-500">live on the website</p>
        </div>
        <div className="card-glass p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Total Leads
            </p>
            <Inbox className="h-4 w-4 text-gold-400" />
          </div>
          <p className="stat-num mt-2 text-white">
            {[...pipelineMap.values()].reduce((a: number, b) => a + (b ?? 0), 0)}
          </p>
          <p className="mt-1 text-[12px] text-slate-500">all time</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Service split (today) */}
        <div className="card-glass p-6">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
            Today by Service
          </h2>
          <div className="mt-5 space-y-3.5">
            {serviceCounts.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-gold-300">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="w-36 truncate text-[13px] font-semibold text-slate-200">{s.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                    style={{ width: todayLeads ? `${Math.max(6, (s.count / todayLeads) * 100)}%` : "0%" }}
                  />
                </div>
                <span className="w-6 text-right text-[13px] font-extrabold text-white">{s.count}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] text-slate-500">
            Counts are enquiry-based; a flight enquiry inside a visa flow is filed under its own
            service.
          </p>
        </div>

        {/* Pipeline */}
        <div className="card-glass p-6">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
            Lead Pipeline — All Time
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {statusOrder.map((s) => (
              <div
                key={s}
                className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5"
              >
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ring-1 ${statusColor(s)}`}>
                  {s}
                </span>
                <span className="text-sm font-extrabold text-white">{pipelineMap.get(s) ?? 0}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/admin/leads" className="btn-ghost justify-between !py-2.5 !text-[13px]">
              View all leads
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/admin/visa-services" className="btn-ghost justify-between !py-2.5 !text-[13px]">
              Manage visa services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/admin/destinations" className="btn-ghost justify-between !py-2.5 !text-[13px]">
              Destinations &amp; packages
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="card-glass overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-400">
            Recent Enquiries
          </h2>
          <Link href="/admin/leads" className="flex items-center gap-1 text-[13px] font-bold text-gold-300 hover:text-gold-200">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-6 py-3">Lead No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Service</th>
                <th className="px-6 py-3">Destination</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((l) => (
                <tr key={l.id} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                  <td className="px-6 py-3.5 font-bold text-gold-300">{l.leadNo}</td>
                  <td className="px-6 py-3.5 font-semibold text-white">{l.name}</td>
                  <td className="px-6 py-3.5 text-slate-300">{l.service}</td>
                  <td className="px-6 py-3.5 text-slate-400">{l.destination || "—"}</td>
                  <td className="px-6 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-extrabold ring-1 ${statusColor(l.status)}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400">{fmt.format(l.createdAt)}</td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No enquiries yet — they will appear here as soon as visitors submit forms.
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
