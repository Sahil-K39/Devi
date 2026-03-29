import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createProduct, getActiveProducts, getAllProducts } from "@/lib/content-store";
import { z } from "zod";

const assetPathSchema = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith("/") || /^https?:\/\//.test(value),
    "Use a root-relative path or an absolute URL"
  );

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  tagline: z.string().optional(),
  description: z.string().min(6),
  priceCents: z.number().int().positive(),
  badge: z.string().optional(),
  heroImage: assetPathSchema,
  gallery: z.array(assetPathSchema).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get("all") === "true";

  const products = includeInactive
    ? await getAllProducts()
    : await getActiveProducts();

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const input = productSchema.parse(body);
    const created = await createProduct({
      name: input.name,
      slug: input.slug,
      tagline: input.tagline ?? null,
      description: input.description,
      priceCents: input.priceCents,
      badge: input.badge ?? null,
      heroImage: input.heroImage,
      gallery: input.gallery ?? [],
      tags: input.tags ?? [],
      featured: input.featured ?? false,
      active: input.active ?? true,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to create product",
      },
      { status: 400 }
    );
  }
}
