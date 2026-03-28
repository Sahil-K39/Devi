import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-16 pt-28 md:px-10">
        <div className="rounded-3xl border border-black/5 bg-white/80 p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">
            Checkout canceled
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            No worries—your cart is safe.
          </h1>
          <p className="mt-2 text-muted">
            You can revisit the product page or browse the rest of the
            collection anytime.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/products"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)]"
            >
              Return to products
            </Link>
            <Link
              href="/"
              className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
            >
              Back home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
