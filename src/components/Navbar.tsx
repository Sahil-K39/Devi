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
          "mx-auto max-w-6xl rounded-[2rem] border border-black/[0.06] px-4 py-3 md:px-5",
          "backdrop-blur-lg bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.06)]",
          "mt-6"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase">
            Devi Divine
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-6 text-sm text-muted md:flex">
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
          <div className="hidden items-center gap-3 md:flex">
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
          <details className="relative md:hidden">
            <summary className="list-none rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-3xl border border-black/8 bg-white/95 p-4 text-sm shadow-[0_24px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-muted transition hover:bg-black/[0.03] hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/products"
                  className="rounded-full bg-ink px-4 py-3 text-center font-semibold text-white"
                >
                  Shop
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-black/10 bg-white px-4 py-3 text-center font-semibold text-ink"
                >
                  Contact
                </Link>
                <Link
                  href="/admin"
                  className="rounded-full border border-black/10 bg-white px-4 py-3 text-center font-semibold text-ink"
                >
                  Admin
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
