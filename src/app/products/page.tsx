import Link from "next/link";
import Image from "next/image";
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
  const [firstProduct, secondProduct] = products;

  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />

      <section className="overflow-hidden bg-[linear-gradient(135deg,rgba(250,204,183,0.94),rgba(255,236,222,0.86)_32%,rgba(244,170,146,0.76)_62%,rgba(255,225,205,0.92))] pt-36">
        <div className="section-shell pb-20">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-4xl">
              <span className="kicker">Devi Divine / The living collection</span>
              <h1 className="mt-5 max-w-[8ch] font-display text-6xl leading-[0.92] text-accent md:text-[6.1rem]">
                Pieces that carry
                <br />
                presence before
                <br />
                they speak.
              </h1>
              <p className="mt-6 max-w-xl text-lg font-light leading-8 text-[#7b5c4d]">
                A wardrobe of long drapes, softened layers, river-light fabrics, and
                silhouettes that stay elegant in ceremony, travel, and street life.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <span className="hero-chip">Editorial drape</span>
                <span className="hero-chip">Lightweight ritual wear</span>
                <span className="hero-chip">{products.length} pieces in the vault</span>
              </div>
            </div>

            <div className="grid items-start gap-4 md:grid-cols-[0.82fr_1fr]">
              <div className="space-y-4 md:translate-y-12">
                <div className="paper-luxe rounded-[2rem] p-4">
                  <div className="relative aspect-[0.92] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/devi/devi-1.jpg"
                      alt="Editorial textile detail"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 18vw, 40vw"
                    />
                  </div>
                </div>

                <div className="paper-luxe rounded-[1.8rem] px-5 py-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                    Shot on sacred steps
                  </p>
                  <p className="mt-3 font-display text-3xl text-ink">
                    Stone, sunlight, and soft structure.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    The collection is photographed in motion so the drape, weight,
                    and character of each piece stay honest.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="paper-luxe rounded-[2.2rem] p-5">
                  <div className="relative aspect-[0.9] overflow-hidden rounded-[1.8rem]">
                    <Image
                      src="/devi/devi-5.jpg"
                      alt="Devi Divine collection moodboard"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 26vw, 60vw"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="paper-luxe rounded-[1.4rem] px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                      Artisans observed
                    </p>
                    <p className="mt-2 font-display text-3xl text-accent">04</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-[rgba(122,0,9,0.9)] px-4 py-4 text-[#fff4eb] shadow-[0_16px_30px_rgba(122,0,9,0.12)]">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#f1d9ca]">
                      Collection span
                    </p>
                    <p className="mt-2 font-display text-3xl">
                      {products.length.toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>

                <div className="paper-luxe rounded-[1.8rem] px-5 py-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                    Collection mood
                  </p>
                  <p className="mt-3 font-display text-3xl text-ink">
                    Ritual pieces meant to be seen in movement.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Layered silhouettes, tactile finishes, and color stories that feel
                    ceremonial without becoming costume.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="paper-luxe mt-16 rounded-[2.4rem] px-6 py-6 md:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-8">
                {filterSets.map((filter) => (
                  <details key={filter.label} className="group relative">
                    <summary className="list-none cursor-pointer text-xs font-semibold uppercase tracking-[0.28em] text-ink [&::-webkit-details-marker]:hidden">
                      {filter.label}
                      <span className="ml-2 text-accent">+</span>
                    </summary>
                    <div className="absolute top-[calc(100%+1rem)] z-20 min-w-52 rounded-[1.5rem] bg-white/95 p-5 shadow-[0_24px_60px_rgba(72,48,38,0.16)]">
                      <div className="flex flex-col gap-3">
                        {filter.options.map((option) => (
                          <span key={option} className="font-display text-lg text-muted">
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  </details>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-muted">
                <span>{products.length} artifacts observed</span>
                <Link href="/contact" className="btn btn-link">
                  Bespoke inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        {(firstProduct || secondProduct) && (
          <div className="mb-14 grid gap-5 lg:grid-cols-2">
            {firstProduct && (
              <div className="paper-luxe rounded-[2.1rem] px-6 py-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  Curator pick
                </p>
                <p className="mt-3 font-display text-4xl text-ink">{firstProduct.name}</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  {firstProduct.tagline ??
                    "An editorial silhouette that moves easily between ritual and city light."}
                </p>
              </div>
            )}
            {secondProduct && (
              <div className="paper-luxe rounded-[2.1rem] px-6 py-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  Most requested
                </p>
                <p className="mt-3 font-display text-4xl text-ink">{secondProduct.name}</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                  {secondProduct.tagline ??
                    "Favored for its softness, movement, and effortless ceremonial presence."}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              variant={index % 3 === 0 ? "arch" : index % 3 === 1 ? "framed" : "classic"}
              offset={index % 3 === 1}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xs uppercase tracking-[0.34em] text-muted">
            Discover more Devi artifacts
          </p>
          <div className="mt-4 text-accent-soft">↓</div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
