import Link from "next/link";
import clsx from "clsx";
import {
  ArchiveBoxIcon,
  HomeModernIcon,
  InboxIcon,
  PlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { href: "/admin", label: "Atelier", key: "home", icon: HomeModernIcon },
  { href: "/admin/products", label: "Vault", key: "products", icon: ArchiveBoxIcon },
  { href: "/admin/messages", label: "Messages", key: "messages", icon: InboxIcon },
  { href: "/", label: "Storefront", key: "site", icon: SparklesIcon },
];

export function AdminShell({
  active,
  title,
  subtitle,
  children,
  aside,
}: {
  active: "home" | "products" | "messages";
  title: string;
  subtitle: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <main className="admin-page">
      <aside className="hidden h-screen w-72 flex-col border-r border-white/5 bg-[rgba(20,12,12,0.95)] px-6 py-8 lg:fixed lg:left-0 lg:top-0 lg:flex">
        <div className="px-3">
          <Link href="/" className="font-admin text-3xl text-[var(--admin-accent)]">
            Devi Divine
          </Link>
          <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[var(--admin-muted)]">
            Eternal Collection
          </p>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-4 rounded-full px-5 py-3 transition",
                  isActive
                    ? "bg-[rgba(255,180,171,0.12)] text-[var(--admin-accent)]"
                    : "text-[var(--admin-muted)] hover:bg-white/5 hover:text-[var(--admin-accent)]"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-admin text-sm uppercase tracking-[0.24em]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/admin/products"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[rgba(156,58,56,0.96)] px-5 py-4 text-sm uppercase tracking-[0.24em] text-[var(--admin-text)] shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5"
        >
          <PlusIcon className="h-4 w-4" />
          Enshrine New Piece
        </Link>
      </aside>

      <div className="lg:ml-72">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-[rgba(23,15,16,0.72)] backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-6 md:px-10">
            <div>
              <h1 className="font-admin text-4xl tracking-tight text-[var(--admin-accent)]">
                {title}
              </h1>
              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-[var(--admin-muted)]">
                {subtitle}
              </p>
            </div>

            <div className="hidden items-center gap-3 rounded-full bg-white/5 px-3 py-2 md:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,180,171,0.12)] text-[var(--admin-accent)]">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <div className="pr-2">
                <p className="font-admin text-sm text-[var(--admin-text)]">Arjun V.</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--admin-muted)]">
                  Curator
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-8 px-6 py-8 md:px-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div>{children}</div>
          {aside && <div className="hidden xl:block">{aside}</div>}
        </section>
      </div>
    </main>
  );
}
