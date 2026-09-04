import DestinationForm from "@/components/admin/destination-form";

export const metadata = { title: "New Destination" };

export default function NewDestinationPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-gold-400">Content</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">New Destination</h1>
        <p className="mt-1 text-sm text-slate-400">It will appear at /destinations/&lt;slug&gt;.</p>
      </div>
      <div className="card-glass p-6 sm:p-8">
        <DestinationForm isNew />
      </div>
    </div>
  );
}
