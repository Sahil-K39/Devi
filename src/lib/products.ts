import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";

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
};

const parseList = (value: string | null) => {
  try {
    return value ? (JSON.parse(value) as string[]) : [];
  } catch (error) {
    console.error("Failed to parse list", error);
    return [];
  }
};

export const stringifyList = (value: string[] | undefined | null) =>
  JSON.stringify(value ?? []);

export const money = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);

const mapProduct = (p: Product): ProductDTO => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  tagline: p.tagline,
  description: p.description,
  priceCents: p.priceCents,
  badge: p.badge,
  heroImage: p.heroImage,
  gallery: parseList(p.galleryJson),
  tags: parseList(p.tagsJson),
  featured: p.featured,
  active: p.active,
});

export async function getProducts(options: { includeInactive?: boolean } = {}) {
  const products = await prisma.product.findMany({
    where: options.includeInactive ? {} : { active: true },
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
  });
  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? mapProduct(product) : null;
}

export async function getFeaturedProduct() {
  const product = await prisma.product.findFirst({
    where: { active: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return product ? mapProduct(product) : null;
}
