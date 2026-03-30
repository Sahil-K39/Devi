import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const [heroProduct, secondProduct, thirdProduct] = products;

  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24">
        <div className="absolute inset-0">
          <Image
            src="/devi/devi-4.jpg"
            alt="Devi Divine hero"
            fill
            priority
            className="object-cover brightness-[0.74] sepia-[0.16]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_22%,rgba(255,244,224,0.78),transparent_22%),linear-gradient(90deg,rgba(26,14,12,0.62),rgba(26,14,12,0.18)_44%,rgba(254,249,235,0.58)),linear-gradient(180deg,rgba(36,29,23,0.16),rgba(254,249,235,0.9))]" />
        </div>

        <div className="section-shell relative z-10">
          <div className="grid min-h-[calc(100vh-9rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <span className="kicker">Pushkar / Devotional wardrobe</span>
              <h1 className="mt-6 font-display text-6xl leading-[0.9] text-[#2d2018] md:text-[7.2rem]">
                Wearable devotion,
                <br />
                cut for movement
                <br />
                and light.
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-light leading-9 text-[#5f4d41] md:text-xl">
                A slow collection of ritual-ready garments shaped on sacred steps in
                Mexico and finished with warmth, air, and drape in mind. Everything
                is made to feel graceful in motion and grounded at rest.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/products" className="btn btn-primary">
                  Shop the collection
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Book a private fitting
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="hero-chip">Hand-finished silhouettes</span>
                <span className="hero-chip">Ceremony to street</span>
                <span className="hero-chip">Soft structure / no stiffness</span>
              </div>
            </div>

            <div className="devi-orb relative">
              <div className="grid gap-4 md:grid-cols-[0.82fr_1fr]">
                <div className="paper-luxe order-2 rounded-[2.1rem] p-4 md:order-1 md:translate-y-16">
                  <div className="relative aspect-[0.76] overflow-hidden rounded-[1.6rem]">
                    <Image
                      src="/devi/devi-2.jpg"
                      alt="Devi Divine movement portrait"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 18vw, 45vw"
                    />
                  </div>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted">
                    Sacred motion
                  </p>
                  <p className="mt-2 font-display text-2xl text-ink">
                    Breath, posture, softness.
                  </p>
                </div>

                <div className="paper-luxe order-1 rounded-[2.4rem] p-5 md:order-2">
                  <div className="relative aspect-[0.92] overflow-hidden rounded-[1.8rem]">
                    <Image
                      src="/devi/devi-3.jpg"
                      alt="Devi Divine editorial image"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 28vw, 80vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,29,23,0),rgba(36,29,23,0.2))]" />
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {heroProduct && (
                      <div className="rounded-[1.5rem] bg-[rgba(255,255,255,0.72)] px-4 py-4">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                          New arrival
                        </p>
                        <p className="mt-2 font-display text-2xl text-ink">
                          {heroProduct.name}
                        </p>
                        {heroProduct.tagline && (
                          <p className="mt-2 text-sm leading-6 text-muted">
                            {heroProduct.tagline}
                          </p>
                        )}
                      </div>
                    )}
                    {secondProduct && (
                      <div className="rounded-[1.5rem] bg-[rgba(122,0,9,0.9)] px-4 py-4 text-[#fff6ef]">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#f1d9ca]">
                          Studio favorite
                        </p>
                        <p className="mt-2 font-display text-2xl">
                          {secondProduct.name}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#f1d9ca]">
                          Designed to move with the body instead of sitting away from it.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-24 md:py-32">
        <div className="editorial-grid items-center gap-10">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(72,48,38,0.14)]">
              <Image
                src="/devi/devi-1.jpg"
                alt="Weaving in warm light"
                width={900}
                height={1100}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="paper-panel absolute -bottom-10 right-4 hidden w-44 rounded-[1.6rem] p-3 md:block">
              <Image
                src="/devi/devi-3.jpg"
                alt="Fabric detail"
                width={320}
                height={420}
                className="h-auto w-full rounded-[1.2rem] object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <span className="kicker">Our Heritage</span>
            <h2 className="font-display text-5xl italic leading-[0.92] text-ink md:text-7xl">
              Sun-Bleached Silence,
              <br />
              Worn in Intention.
            </h2>
            <p className="max-w-xl text-lg font-light leading-8 text-muted">
              Every piece begins in stillness and is shaped for a life in motion.
              Breathable cloth, softened structure, and earth-led color let the
              garments move from practice into the street without losing grace.
            </p>
            <p className="max-w-xl text-lg font-light leading-8 text-muted">
              It is less a wardrobe than a daily ritual: something to return to,
              again and again, in good light.
            </p>
            <div className="paper-luxe max-w-xl rounded-[1.8rem] px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                What defines the line
              </p>
              <div className="mt-4 grid gap-3 text-sm text-muted">
                <p>01 / Breathable layering that never feels overbuilt.</p>
                <p>02 / Hand-drawn prints and sacred color stories.</p>
                <p>03 / Editorial silhouettes softened for everyday use.</p>
              </div>
            </div>
            <Link href="/materials" className="btn btn-link">
              Read the artisan story
            </Link>
          </div>
        </div>
      </section>

      <section className="pattern-lattice bg-[rgba(248,243,229,0.76)] py-24 md:py-32">
        <div className="section-shell">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="kicker">The Seasonal Loom</span>
              <h2 className="mt-4 font-display text-5xl italic text-ink md:text-6xl">
                Featured Rituals
              </h2>
            </div>
            <Link href="/products" className="font-display text-xl italic text-accent transition hover:text-accent-soft">
              View All Collections
            </Link>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {products.slice(0, 3).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={index === 0 ? "arch" : index === 1 ? "classic" : "framed"}
                offset={index === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-24 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="paper-luxe rounded-[2.4rem] px-8 py-10">
            <span className="kicker">Why it feels different</span>
            <h3 className="mt-5 font-display text-4xl italic leading-tight text-ink md:text-5xl">
              The line between dressing and ritual gets softer here.
            </h3>
            <p className="mt-6 text-base leading-8 text-muted">
              Every look is styled to feel sacred without becoming costume. The
              proportions stay relaxed, the textures stay legible, and the whole
              experience remains calm from first scroll to final checkout.
            </p>
          </div>

          <div className="paper-luxe rounded-[2.4rem] px-8 py-10 text-center">
            <p className="font-display text-3xl italic leading-relaxed text-ink md:text-5xl">
              “Slipping into the robe feels like a return to warm stone and quiet sun.
              The fabric carries a stillness that changes the whole day.”
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.28em] text-muted">
              Elena R. / San Francisco
            </p>
            {thirdProduct && (
              <div className="mt-8 inline-flex rounded-full bg-[rgba(255,255,255,0.72)] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-accent">
                Also adored: {thirdProduct.name}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative h-[34rem] overflow-hidden md:h-[44rem]">
        <Image
          src="/devi/devi-5.jpg"
          alt="Devotion in water"
          fill
          className="object-cover sepia-[0.08] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(122,0,9,0.18),rgba(36,29,23,0.18))]" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="glass-nav max-w-xl rounded-[2rem] px-8 py-10 text-center shadow-[0_26px_80px_rgba(72,48,38,0.16)]">
            <h3 className="font-display text-4xl italic text-ink md:text-5xl">
              Woven for Lifetimes
            </h3>
            <p className="mt-5 text-lg leading-8 text-muted">
              Created to age with you, gather memory, and soften beautifully through
              seasons of use.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
