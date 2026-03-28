import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/5 bg-white/70 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">
            Devi Divine
          </p>
          <h3 className="text-xl font-semibold text-ink">
            Made to feel like silk on skin.
          </h3>
        </div>
        <div className="flex gap-4 text-sm text-muted">
          <Link href="/contact" className="hover:text-ink">
            Contact
          </Link>
          <Link href="/products" className="hover:text-ink">
            Store
          </Link>
          <Link href="mailto:hello@devidivine.com" className="hover:text-ink">
            hello@devidivine.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
