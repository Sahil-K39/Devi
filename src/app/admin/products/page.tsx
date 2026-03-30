import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllProducts } from "@/lib/content-store";
import { ProductManager } from "@/components/admin/ProductManager";
import { AdminShell } from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin/products");
  }

  const products = await getAllProducts();
  const featured = products.find((product) => product.featured) ?? products[0] ?? null;

  return (
    <AdminShell
      active="products"
      title="Vault"
      subtitle="Document the spiritual lineage of each new artifact"
      aside={
        featured ? (
          <div className="admin-panel rounded-[2.2rem] p-6">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
              Curator note
            </p>
            <div className="mt-5 overflow-hidden rounded-[1.6rem] bg-white/5">
              <Image
                src={featured.heroImage}
                alt={featured.name}
                width={420}
                height={560}
                className="h-52 w-full object-cover"
              />
            </div>
            <h3 className="mt-5 font-admin text-3xl text-[var(--admin-text)]">
              {featured.name}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--admin-muted)]">
              Keep the copy devotional, the imagery tactile, and the details clear
              enough for the storefront to feel unhurried.
            </p>
            <div className="mt-5 space-y-3 text-[10px] uppercase tracking-[0.24em] text-[var(--admin-muted)]">
              <p>Primary frame approved</p>
              <p>Story tone aligned</p>
              <p>Checkout-ready metadata</p>
            </div>
          </div>
        ) : null
      }
    >
      <ProductManager initial={products} />
    </AdminShell>
  );
}
