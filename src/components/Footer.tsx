import Link from "next/link";

const footerLinks = [
  { href: "/products", label: "Collections" },
  { href: "/materials", label: "Sustainability" },
  { href: "/rituals", label: "Ritual Guide" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-[linear-gradient(180deg,rgba(248,243,229,0.86),rgba(244,236,221,0.96))] py-16">
      <div className="section-shell">
        <div className="paper-luxe pattern-lattice rounded-[2.6rem] px-8 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-xl">
              <p className="font-display text-3xl italic text-accent md:text-5xl">
                Devi Divine
              </p>
              <p className="mt-5 max-w-lg text-base leading-8 text-muted">
                Garments for ceremony, movement, and the long afterglow of beautiful
                materials. Quietly shaped in warm light and made to soften with time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary">
                  Enter the collection
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Write to the studio
                </Link>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  Navigate
                </p>
                <div className="mt-4 grid gap-3 text-sm uppercase tracking-[0.2em] text-muted">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  Studio note
                </p>
                <p className="mt-4 text-sm leading-7 text-muted">
                  For bespoke fittings, ceremonial styling, and slower conversations,
                  reach us directly and we will guide you with care.
                </p>
                <p className="mt-5 text-xs uppercase tracking-[0.24em] text-accent">
                  hello@devidivine.com
                </p>
              </div>
            </div>
          </div>

          <div className="section-divider mt-10" />

          <div className="mt-8 flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              2026 Devi Divine. Eternal heritage, woven grace.
            </p>
            <div className="space-y-1">
              <p className="font-accent text-xl text-accent">shanti shanti shanti</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
