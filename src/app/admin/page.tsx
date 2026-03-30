import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllProducts, getMessages } from "@/lib/content-store";
import { AdminShell } from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin");
  }

  const [products, messages] = await Promise.all([getAllProducts(), getMessages()]);
  const featured = products[0];

  return (
    <AdminShell
      active="home"
      title="Divine Admin"
      subtitle="Guardians of the Sacred Arts"
      aside={
        featured ? (
          <div className="admin-panel rounded-[2.2rem] p-6">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
              Recently enshrined
            </p>
            <div className="mt-5 overflow-hidden rounded-[1.6rem] bg-white/5">
              <Image
                src={featured.heroImage}
                alt={featured.name}
                width={560}
                height={720}
                className="h-56 w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-admin text-3xl text-[var(--admin-text)]">
              {featured.name}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[var(--admin-muted)]">
              {featured.tagline ?? featured.description}
            </p>
            <div className="mt-6 space-y-3 text-xs uppercase tracking-[0.24em] text-[var(--admin-muted)]">
              <p>Imagery captured</p>
              <p>Pedigree confirmed</p>
              <p>Sanctity review pending</p>
            </div>
          </div>
        ) : null
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="admin-panel rounded-[2.4rem] p-8">
          <h2 className="font-admin text-4xl text-[var(--admin-accent)]">
            Atelier overview
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-8 text-[var(--admin-muted)]">
            Keep the collection, inquiries, and the sacred storefront aligned from
            one place.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StatCard label="Active artifacts" value={products.length.toString()} />
            <StatCard label="Inbox notes" value={messages.length.toString()} />
            <StatCard label="Checkout flow" value="Live" />
          </div>
        </div>

        <div className="admin-panel rounded-[2.4rem] p-8">
          <h2 className="font-admin text-4xl text-[var(--admin-accent)]">
            Quick passage
          </h2>
          <div className="mt-8 grid gap-4">
            <ActionCard
              title="Curate the vault"
              body="Create, edit, or hide pieces from the collection."
              href="/admin/products"
            />
            <ActionCard
              title="Open messages"
              body="Review requests arriving from the studio form."
              href="/admin/messages"
            />
            <ActionCard
              title="View storefront"
              body="See the public site exactly as visitors do."
              href="/"
            />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.8rem] bg-white/5 px-6 py-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
      <p className="text-4xl font-admin text-[var(--admin-accent)]">{value}</p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">
        {label}
      </p>
    </div>
  );
}

function ActionCard({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[1.8rem] bg-white/5 px-6 py-6 transition hover:-translate-y-0.5 hover:bg-white/[0.07]"
    >
      <h3 className="font-admin text-2xl text-[var(--admin-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--admin-muted)]">{body}</p>
    </Link>
  );
}
