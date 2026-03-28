import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckoutButton } from "@/components/CheckoutButton";
import { getProductBySlug, money } from "@/lib/products";

type Props = {
  params: { slug: string };
};

export const revalidate = 0;

export default async function ProductDetail({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-28 md:px-10">
        <Link href="/products" className="text-sm text-muted hover:text-ink">
          ← Back to collection
        </Link>

        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
            <div className="relative aspect-[4/5]">
              <Image
                src={product.heroImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3 p-4">
                {product.gallery.map((img) => (
                  <div
                    key={img}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} gallery`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-muted">
                Devi Divine
              </p>
              <h1 className="text-4xl font-semibold leading-tight">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-lg text-muted">{product.tagline}</p>
              )}
            </div>
            <p className="text-base leading-relaxed text-ink">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-wide text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Price</p>
                  <p className="text-3xl font-semibold">{money(product.priceCents)}</p>
                </div>
                <CheckoutButton productSlug={product.slug} />
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-[#f3ede3] p-4 text-sm text-muted">
              <p>• Ships in 3-5 business days · carbon neutral packaging</p>
              <p>• 30-day texture guarantee or full refund</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
