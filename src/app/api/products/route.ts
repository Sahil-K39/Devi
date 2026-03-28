import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stringifyList } from "@/lib/products";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  tagline: z.string().optional(),
  description: z.string().min(6),
  priceCents: z.number().int().positive(),
  badge: z.string().optional(),
  heroImage: z.string().url(),
  gallery: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get("all") === "true";

  const products = await prisma.product.findMany({
    where: includeInactive ? {} : { active: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

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
    const created = await prisma.product.create({
      data: {
        name: input.name,
        slug: input.slug,
        tagline: input.tagline,
        description: input.description,
        priceCents: input.priceCents,
        badge: input.badge,
        heroImage: input.heroImage,
        galleryJson: stringifyList(input.gallery),
        tagsJson: stringifyList(input.tags),
        featured: input.featured ?? false,
        active: input.active ?? true,
      },
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
