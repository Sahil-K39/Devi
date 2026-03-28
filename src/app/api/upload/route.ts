import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ message: "File too large (max 10MB)" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(file.name) || ".jpg";
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const filepath = path.join(uploadsDir, name);

  await fs.writeFile(filepath, buffer);

  const url = `/uploads/${name}`;
  return NextResponse.json({ url });
}
