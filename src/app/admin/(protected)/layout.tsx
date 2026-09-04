import { requireUser } from "@/lib/auth";
import AdminShell from "@/components/admin/admin-shell";

export const metadata = { robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return <AdminShell user={user}>{children}</AdminShell>;
}
