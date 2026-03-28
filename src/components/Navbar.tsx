import Link from "next/link";
import clsx from "clsx";

const links = [
  { href: "/rituals", label: "Rituals" },
  { href: "/products", label: "Collection" },
  { href: "/materials", label: "Materials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 px-6 md:px-10",
        "transition-all duration-300"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex max-w-6xl items-center gap-6 rounded-full border border-black/[0.06] px-5 py-3",
          "backdrop-blur-lg bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.06)]",
          "mt-6"
        )}
      >
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase">
          Devi Divine
        </Link>
        <nav className="flex flex-1 items-center justify-center gap-6 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
