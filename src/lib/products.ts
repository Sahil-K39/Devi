import { defaultProducts } from "@/lib/default-products";
import { money } from "@/lib/money";

export type ProductDTO = {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  description: string;
  priceCents: number;
  badge?: string | null;
  heroImage: string;
  gallery: string[];
  tags: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export const stringifyList = (value: string[] | undefined | null) =>
  JSON.stringify(value ?? []);

const fallbackProducts: ProductDTO[] = defaultProducts.map((product) => ({
  ...product,
}));

const sortProducts = (products: ProductDTO[]) =>
  [...products].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }
    return right.createdAt.localeCompare(left.createdAt);
  });

async function loadRuntimeProducts() {
  try {
    const store = await import("@/lib/content-store");
    return {
      getAllProducts: store.getAllProducts,
      getActiveProducts: store.getActiveProducts,
      getProductBySlugRecord: store.getProductBySlugRecord,
    };
  } catch (error) {
    console.error("Falling back to bundled products", error);
    return null;
  }
}

export async function getProducts(options: { includeInactive?: boolean } = {}) {
  const runtime = await loadRuntimeProducts();

  if (!runtime) {
    return options.includeInactive
      ? fallbackProducts
      : fallbackProducts.filter((product) => product.active);
  }

  try {
    const products = options.includeInactive
      ? await runtime.getAllProducts()
      : await runtime.getActiveProducts();

    return products.map((product) => ({ ...product }));
  } catch (error) {
    console.error("Product read failed, using bundled fallback", error);
    return options.includeInactive
      ? fallbackProducts
      : fallbackProducts.filter((product) => product.active);
  }
}

export async function getProductBySlug(slug: string) {
  if (!slug) return null;

  const runtime = await loadRuntimeProducts();
  if (runtime) {
    try {
      const product = await runtime.getProductBySlugRecord(slug);
      if (product?.active) {
        return { ...product };
      }
    } catch (error) {
      console.error("Product detail read failed, using bundled fallback", error);
    }
  }

  const fallback = fallbackProducts.find((product) => product.slug === slug) ?? null;
  return fallback?.active ? fallback : null;
}

export async function getFeaturedProduct() {
  const products = await getProducts();
  const featured = sortProducts(products).find((product) => product.featured);
  return featured ?? products[0] ?? null;
}

export { money };
