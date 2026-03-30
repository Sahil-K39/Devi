import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProductBySlug, money } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />

      <section className="section-shell pt-32">
        <Link href="/products" className="text-xs uppercase tracking-[0.28em] text-muted">
          Back to collection
        </Link>
      </section>

      <section className="section-shell py-10 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.94fr]">
          <div className="devi-orb space-y-5">
            <div className="paper-luxe overflow-hidden rounded-[2.6rem] p-4 md:p-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,29,23,0),rgba(36,29,23,0.14))]" />
              </div>
            </div>

            {product.gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {product.gallery.slice(0, 2).map((image) => (
                  <div
                    key={image}
                    className="paper-luxe relative aspect-[4/3] overflow-hidden rounded-[1.8rem] p-3"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} detail`}
                      fill
                      className="rounded-[1.2rem] object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
              <div className="paper-luxe rounded-[1.8rem] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  Drape
                </p>
                <p className="mt-3 font-display text-3xl text-ink">Fluid</p>
              </div>
              <div className="paper-luxe rounded-[1.8rem] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  Feel
                </p>
                <p className="mt-3 font-display text-3xl text-ink">Softened</p>
              </div>
              <div className="paper-luxe rounded-[1.8rem] px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  Mood
                </p>
                <p className="mt-3 font-display text-3xl text-ink">Grounded</p>
              </div>
            </div>
          </div>

          <div className="paper-luxe rounded-[2.6rem] px-8 py-10 md:px-10 md:py-12 lg:sticky lg:top-28">
            <span className="kicker">Devi Divine / Ritual Artifact</span>
            <h1 className="mt-4 font-display text-5xl leading-[0.92] text-accent md:text-6xl">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="mt-4 font-display text-2xl italic text-muted">
                {product.tagline}
              </p>
            )}

            <p className="mt-8 text-lg font-light leading-8 text-muted">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[rgba(255,255,255,0.6)] px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="paper-inset mt-10 rounded-[2rem] px-6 py-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">
                    Sacred value
                  </p>
                  <p className="mt-2 font-display text-4xl text-accent-soft">
                    {money(product.priceCents)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/checkout/${product.slug}`} className="btn btn-primary">
                    Begin sacred path
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Bespoke inquiry
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.7rem] bg-white/45 px-5 py-5">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Material prayer
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Breathable cloth, patient stitching, and silhouettes made for
                  movement rather than display-only wear.
                </p>
              </div>
              <div className="rounded-[1.7rem] bg-white/45 px-5 py-5">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Delivery rhythm
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Packaged with a care note and prepared within a few business
                  days before it begins its passage.
                </p>
              </div>
            </div>

            <div className="paper-inset mt-8 rounded-[2rem] px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                Ritual styling note
              </p>
              <p className="mt-4 font-display text-2xl italic text-ink">
                Layer it with bare skin, quiet jewelry, and enough room for the fabric
                to answer the body naturally.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
