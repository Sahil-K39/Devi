import Link from "next/link";
import {
  Bars3Icon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const links = [
  { href: "/products", label: "Collections" },
  { href: "/rituals", label: "Rituals" },
  { href: "/materials", label: "Artisans" },
  { href: "/contact", label: "Our Story" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 md:px-8">
      <div className="section-shell mt-4">
        <div className="glass-nav rounded-[2rem] border border-[rgba(122,0,9,0.08)] px-4 py-4 shadow-[0_20px_60px_rgba(72,48,38,0.08)] md:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Link
                href="/"
                className="font-display text-2xl italic tracking-tight text-accent md:text-4xl"
              >
                Devi Divine
              </Link>
              <p className="mt-1 hidden text-[10px] uppercase tracking-[0.3em] text-muted lg:block">
                Eternal collection / ritual wardrobe
              </p>
            </div>

            <nav className="hidden items-center gap-7 lg:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted transition hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/products"
                className="btn min-h-0 border border-[rgba(122,0,9,0.1)] bg-white/70 px-5 py-3 text-[10px] text-accent shadow-[0_12px_24px_rgba(72,48,38,0.06)]"
              >
                Shop
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full bg-[rgba(122,0,9,0.9)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#fff8f1] shadow-[0_14px_28px_rgba(122,0,9,0.16)] transition hover:-translate-y-0.5"
              >
                <SparklesIcon className="h-4 w-4" />
                Admin
              </Link>
            </div>

            <details className="relative md:hidden">
              <summary className="list-none rounded-full bg-white/75 p-2.5 text-accent shadow-[0_10px_30px_rgba(72,48,38,0.08)] [&::-webkit-details-marker]:hidden">
                <Bars3Icon className="h-5 w-5" />
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.9rem)] w-72 rounded-[2rem] bg-[rgba(254,249,235,0.98)] p-4 shadow-[0_26px_60px_rgba(72,48,38,0.16)] backdrop-blur-xl">
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-[1.4rem] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted transition hover:bg-white hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 grid gap-2">
                  <Link href="/products" className="btn btn-primary">
                    Explore the Loom
                  </Link>
                  <Link href="/admin" className="btn btn-ghost">
                    Admin
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
