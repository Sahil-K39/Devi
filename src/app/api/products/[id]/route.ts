import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stringifyList } from "@/lib/products";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().optional(),
  priceCents: z.number().int().positive().optional(),
  badge: z.string().optional(),
  heroImage: z.string().url().optional(),
  gallery: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

async function ensureAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return false;
  }
  return true;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);
    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        galleryJson:
          data.gallery !== undefined ? stringifyList(data.gallery) : undefined,
        tagsJson: data.tags !== undefined ? stringifyList(data.tags) : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to update" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await ensureAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to delete" },
      { status: 400 }
    );
  }
}
