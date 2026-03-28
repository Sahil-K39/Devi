import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProducts } from "@/lib/products";
import Link from "next/link";

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-base text-ink">
      <Navbar />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-28 md:px-10">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">
            Shop
          </p>
          <h1 className="text-4xl font-semibold">All rituals</h1>
          <p className="max-w-2xl text-muted">
            Swipe into any product to open the detail page and check out in one
            smooth flow.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-sm text-muted">
          Need a custom SKU or bundle?{" "}
          <Link href="/contact" className="underline">
            Send a note
          </Link>{" "}
          and we will build it for you.
        </div>
      </section>
      <Footer />
    </main>
  );
}
