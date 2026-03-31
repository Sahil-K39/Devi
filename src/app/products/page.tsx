import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

const filterSets = [
  {
    label: "By Ritual",
    options: ["Meditation", "Ceremony", "Daily Life"],
  },
  {
    label: "By Material",
    options: ["Wild Silk", "Hand-Spun Cotton", "Raw Linen"],
  },
];

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />

      <section className="section-shell pt-36 pb-16 md:pb-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="kicker">Devi Divine / The Autumn Ritual</span>
            <h1 className="mt-5 font-display text-6xl leading-none text-accent md:text-[6.4rem]">
              Woven for the Devi
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-8 text-muted">
              A celestial dialogue between sacred fibers and earthly form. Each piece
              is shaped for ritual, softness, and the kind of presence that arrives
              before words do.
            </p>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 text-accent">
              01
            </div>
            <div className="h-px w-24 bg-accent/15" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(237,232,218,0.9)] text-muted">
              {products.length.toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-14">
        <div className="flex flex-wrap items-center justify-between gap-y-6 rounded-[2.2rem] bg-[rgba(255,253,247,0.68)] px-6 py-7 shadow-[0_18px_40px_rgba(89,65,62,0.05)] md:px-8">
          <div className="flex flex-wrap gap-10">
            {filterSets.map((filter) => (
              <details key={filter.label} className="group relative">
                <summary className="flex list-none cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink [&::-webkit-details-marker]:hidden">
                  {filter.label}
                  <span className="text-accent">+</span>
                </summary>
                <div className="absolute left-0 top-[calc(100%+1rem)] z-20 min-w-56 rounded-[1.2rem] bg-white p-5 shadow-[0_24px_60px_rgba(72,48,38,0.12)]">
                  <div className="space-y-3">
                    {filter.options.map((option) => (
                      <p key={option} className="text-sm text-muted">
                        {option}
                      </p>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.28em] text-muted">
            <span>{products.length} artifacts observed</span>
            <Link href="/contact" className="font-semibold text-accent transition hover:text-accent-soft">
              Bespoke inquiry
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              variant={index % 3 === 0 ? "arch" : index % 3 === 1 ? "framed" : "classic"}
              offset={index % 3 === 1}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-muted">
            Discover more Devi artifacts
          </p>
          <div className="mt-3 text-accent-soft">↓</div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
