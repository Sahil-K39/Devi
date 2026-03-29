import { NextResponse } from "next/server";
import { getUploadedImage } from "@/lib/content-store";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ key: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { key } = await params;
  const asset = await getUploadedImage(key);

  if (!asset) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return new NextResponse(asset.body, {
    headers: {
      "Content-Type": asset.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
