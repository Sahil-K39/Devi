import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllProducts, getMessages } from "@/lib/content-store";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin");
  }

  const [products, messages] = await Promise.all([getAllProducts(), getMessages()]);
  const productCount = products.length;
  const messageCount = messages.length;

  return (
    <main className="min-h-screen bg-base text-ink">
      <header className="flex items-center justify-between border-b border-black/5 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            Admin
          </p>
          <h1 className="text-2xl font-semibold">Studio desk</h1>
        </div>
        <Link
          href="/"
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
        >
          View site
        </Link>
      </header>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Products" value={productCount} href="/admin/products" />
          <StatCard label="Messages" value={messageCount} href="/admin/messages" />
          <StatCard label="Orders" value="Checkout live" href="/checkout/success" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ActionCard
            title="Products"
            body="Create, update, or hide products from the collection."
            href="/admin/products"
            cta="Manage products"
          />
          <ActionCard
            title="Messages"
            body="Review new inquiries and keep the inbox organized."
            href="/admin/messages"
            cta="Open inbox"
          />
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string | number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)]"
    >
      <p className="text-sm text-muted">{label}</p>
      <p className="text-3xl font-semibold text-ink">{value}</p>
    </Link>
  );
}

function ActionCard({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-black/5 bg-white/70 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted">{body}</p>
      <Link
        href={href}
        className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)]"
      >
        {cta}
      </Link>
    </div>
  );
}
