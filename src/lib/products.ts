import {
  type ProductRecord,
  getActiveProducts,
  getAllProducts,
  getProductBySlugRecord,
} from "@/lib/content-store";
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

const mapProduct = (product: ProductRecord): ProductDTO => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  tagline: product.tagline,
  description: product.description,
  priceCents: product.priceCents,
  badge: product.badge,
  heroImage: product.heroImage,
  gallery: product.gallery,
  tags: product.tags,
  featured: product.featured,
  active: product.active,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});

export async function getProducts(options: { includeInactive?: boolean } = {}) {
  const products = options.includeInactive
    ? await getAllProducts()
    : await getActiveProducts();

  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  if (!slug) return null;
  const product = await getProductBySlugRecord(slug);
  if (!product || !product.active) return null;
  return mapProduct(product);
}

export async function getFeaturedProduct() {
  const products = await getActiveProducts();
  const product = products.find((item) => item.featured) ?? products[0] ?? null;
  return product ? mapProduct(product) : null;
}

export { money };
