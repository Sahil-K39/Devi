import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="section-shell pt-40 pb-24">
        <div className="mx-auto max-w-3xl rounded-[2.6rem] bg-[rgba(255,253,247,0.9)] px-8 py-12 text-center shadow-[0_26px_70px_rgba(72,48,38,0.1)]">
          <p className="font-accent text-2xl text-accent-soft">Anugraha</p>
          <h1 className="mt-4 font-display text-5xl text-accent md:text-6xl">
            Your ritual is complete
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-8 text-muted">
            A receipt is on its way. Your offering now enters the studio passage and
            will be prepared with care.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn btn-primary">
              Continue shopping
            </Link>
            <Link href="/" className="btn btn-ghost">
              Return home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
