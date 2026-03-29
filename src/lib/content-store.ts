import { getStore } from "@netlify/blobs";
import { promises as fs } from "fs";
import path from "path";
import { randomBytes, randomUUID } from "crypto";
import { defaultProducts } from "@/lib/default-products";

export type MessageStatus = "NEW" | "READ" | "ARCHIVED";

export type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  priceCents: number;
  badge: string | null;
  heroImage: string;
  gallery: string[];
  tags: string[];
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MessageRecord = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

const defaultMessages: MessageRecord[] = [];

const isNetlifyRuntime = () => Boolean(process.env.NETLIFY || process.env.BLOBS_CONTEXT);

const dataStore = () => getStore("devi-data");
const uploadsStore = () => getStore("devi-uploads");

async function withBlobReadFallback<T>(
  label: string,
  run: () => Promise<T>,
  fallback: () => T
) {
  try {
    return await run();
  } catch (error) {
    console.error(`Blob read failed for ${label}`, error);
    return fallback();
  }
}

async function runBlobWrite(label: string, run: () => Promise<void>) {
  try {
    await run();
  } catch (error) {
    console.error(`Blob write failed for ${label}`, error);
    throw new Error(
      "Storage is not ready on Netlify yet. The storefront is still live, but admin changes cannot be saved until storage connects."
    );
  }
}

const isProductRecord = (value: unknown): value is ProductRecord => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ProductRecord>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.slug === "string" &&
    typeof candidate.description === "string" &&
    typeof candidate.priceCents === "number" &&
    typeof candidate.heroImage === "string" &&
    Array.isArray(candidate.gallery) &&
    Array.isArray(candidate.tags) &&
    typeof candidate.featured === "boolean" &&
    typeof candidate.active === "boolean"
  );
};

const isMessageRecord = (value: unknown): value is MessageRecord => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<MessageRecord>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.message === "string" &&
    typeof candidate.status === "string" &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string"
  );
};

const sortProducts = (products: ProductRecord[]) =>
  [...products].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }
    return right.createdAt.localeCompare(left.createdAt);
  });

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeProductInput = (
  input: Partial<Omit<ProductRecord, "id" | "createdAt" | "updatedAt">>
) => ({
  ...input,
  name: input.name?.trim(),
  slug: input.slug ? normalizeSlug(input.slug) : undefined,
  tagline:
    input.tagline == null ? input.tagline : (input.tagline.trim() || null),
  description: input.description?.trim(),
  badge: input.badge == null ? input.badge : (input.badge.trim() || null),
  heroImage: input.heroImage?.trim(),
  gallery: input.gallery?.map((item) => item.trim()).filter(Boolean),
  tags: input.tags?.map((item) => item.trim()).filter(Boolean),
});

const omitUndefined = <T extends Record<string, unknown>>(value: T) =>
  Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined)
  ) as Partial<T>;

const ensureDir = async (target: string) => {
  await fs.mkdir(path.dirname(target), { recursive: true });
};

async function readLocalJson<T>(target: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(target, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await writeLocalJson(target, fallback);
    return fallback;
  }
}

async function writeLocalJson<T>(target: string, data: T) {
  await ensureDir(target);
  await fs.writeFile(target, JSON.stringify(data, null, 2), "utf8");
}

async function getProductsFromLocal() {
  const data = await readLocalJson<ProductRecord[]>(PRODUCTS_FILE, defaultProducts);
  return data.filter(isProductRecord);
}

async function saveProductsToLocal(products: ProductRecord[]) {
  await writeLocalJson(PRODUCTS_FILE, products);
}

async function getMessagesFromLocal() {
  const data = await readLocalJson<MessageRecord[]>(MESSAGES_FILE, defaultMessages);
  return data.filter(isMessageRecord);
}

async function saveMessagesToLocal(messages: MessageRecord[]) {
  await writeLocalJson(MESSAGES_FILE, messages);
}

async function getProductsFromBlobs() {
  return withBlobReadFallback(
    "products",
    async () => {
      const stored = await dataStore().get("products.json", { type: "json" });
      if (!Array.isArray(stored)) {
        await runBlobWrite("products seed", async () => {
          await dataStore().setJSON("products.json", defaultProducts);
        });
        return defaultProducts;
      }

      const normalized = stored.filter(isProductRecord);
      if (!normalized.length) {
        await runBlobWrite("products reset", async () => {
          await dataStore().setJSON("products.json", defaultProducts);
        });
        return defaultProducts;
      }

      return normalized;
    },
    () => defaultProducts
  );
}

async function saveProductsToBlobs(products: ProductRecord[]) {
  await runBlobWrite("products", async () => {
    await dataStore().setJSON("products.json", products);
  });
}

async function getMessagesFromBlobs() {
  return withBlobReadFallback(
    "messages",
    async () => {
      const stored = await dataStore().get("messages.json", { type: "json" });
      if (!Array.isArray(stored)) {
        await runBlobWrite("messages seed", async () => {
          await dataStore().setJSON("messages.json", defaultMessages);
        });
        return defaultMessages;
      }

      return stored.filter(isMessageRecord);
    },
    () => defaultMessages
  );
}

async function saveMessagesToBlobs(messages: MessageRecord[]) {
  await runBlobWrite("messages", async () => {
    await dataStore().setJSON("messages.json", messages);
  });
}

export async function getAllProducts() {
  const products = isNetlifyRuntime()
    ? await getProductsFromBlobs()
    : await getProductsFromLocal();

  return sortProducts(products);
}

export async function getActiveProducts() {
  const products = await getAllProducts();
  return products.filter((product) => product.active);
}

export async function getProductById(id: string) {
  const products = await getAllProducts();
  return products.find((product) => product.id === id) ?? null;
}

export async function getProductBySlugRecord(slug: string) {
  const products = await getAllProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function createProduct(
  input: Omit<ProductRecord, "id" | "createdAt" | "updatedAt">
) {
  const now = new Date().toISOString();
  const products = await getAllProducts();
  const normalized = normalizeProductInput(input);

  if (!normalized.slug) {
    throw new Error("Product slug is required");
  }

  if (products.some((product) => product.slug === normalized.slug)) {
    throw new Error("A product with this slug already exists");
  }

  const record: ProductRecord = {
    name: normalized.name ?? input.name,
    slug: normalized.slug,
    tagline: normalized.tagline ?? null,
    description: normalized.description ?? input.description,
    priceCents: input.priceCents,
    badge: normalized.badge ?? null,
    heroImage: normalized.heroImage ?? input.heroImage,
    gallery: normalized.gallery ?? input.gallery,
    tags: normalized.tags ?? input.tags,
    featured: input.featured,
    active: input.active,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  const next = sortProducts([record, ...products]);
  if (isNetlifyRuntime()) {
    await saveProductsToBlobs(next);
  } else {
    await saveProductsToLocal(next);
  }

  return record;
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<ProductRecord, "id" | "createdAt" | "updatedAt">>
) {
  const products = await getAllProducts();
  const existing = products.find((product) => product.id === id);
  if (!existing) return null;
  const normalized = normalizeProductInput(input);

  if (
    normalized.slug &&
    products.some((product) => product.id !== id && product.slug === normalized.slug)
  ) {
    throw new Error("A product with this slug already exists");
  }

  const updated: ProductRecord = {
    ...existing,
    ...omitUndefined(normalized),
    updatedAt: new Date().toISOString(),
  };

  const next = sortProducts(
    products.map((product) => (product.id === id ? updated : product))
  );

  if (isNetlifyRuntime()) {
    await saveProductsToBlobs(next);
  } else {
    await saveProductsToLocal(next);
  }

  return updated;
}

export async function deleteProduct(id: string) {
  const products = await getAllProducts();
  const next = products.filter((product) => product.id !== id);
  if (next.length === products.length) return false;

  if (isNetlifyRuntime()) {
    await saveProductsToBlobs(next);
  } else {
    await saveProductsToLocal(next);
  }

  return true;
}

export async function getMessages() {
  const messages = isNetlifyRuntime()
    ? await getMessagesFromBlobs()
    : await getMessagesFromLocal();

  return [...messages].sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt)
  );
}

export async function createMessage(
  input: Pick<MessageRecord, "name" | "email" | "phone" | "message">
) {
  const now = new Date().toISOString();
  const message: MessageRecord = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: input.message,
    status: "NEW",
    createdAt: now,
    updatedAt: now,
  };

  const messages = await getMessages();
  const next = [message, ...messages];

  if (isNetlifyRuntime()) {
    await saveMessagesToBlobs(next);
  } else {
    await saveMessagesToLocal(next);
  }

  return message;
}

export async function updateMessageStatus(id: string, status: MessageStatus) {
  const messages = await getMessages();
  const existing = messages.find((message) => message.id === id);
  if (!existing) return null;

  const updated: MessageRecord = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  };

  const next = messages.map((message) => (message.id === id ? updated : message));

  if (isNetlifyRuntime()) {
    await saveMessagesToBlobs(next);
  } else {
    await saveMessagesToLocal(next);
  }

  return updated;
}

const normalizeExt = (filename: string, type: string) => {
  const ext = path.extname(filename);
  if (ext) return ext.toLowerCase();

  switch (type) {
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/avif":
      return ".avif";
    case "image/gif":
      return ".gif";
    default:
      return ".jpg";
  }
};

export async function saveUploadedImage(file: File) {
  const key = `${Date.now()}-${randomBytes(6).toString("hex")}${normalizeExt(
    file.name,
    file.type
  )}`;
  const arrayBuffer = await file.arrayBuffer();

  if (isNetlifyRuntime()) {
    await runBlobWrite("uploads", async () => {
      await uploadsStore().set(key, arrayBuffer, {
        metadata: { contentType: file.type || "application/octet-stream" },
      });
    });
  } else {
    const buffer = Buffer.from(arrayBuffer);
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOADS_DIR, key), buffer);
  }

  return `/api/media/${key}`;
}

const localContentType = (key: string) => {
  const ext = path.extname(key).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".avif":
      return "image/avif";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "image/jpeg";
  }
};

export async function getUploadedImage(key: string) {
  if (isNetlifyRuntime()) {
    return withBlobReadFallback(
      `upload:${key}`,
      async () => {
        const blob = await uploadsStore().getWithMetadata(key, { type: "blob" });
        if (!blob) return null;
        const contentType =
          typeof blob.metadata.contentType === "string"
            ? blob.metadata.contentType
            : "application/octet-stream";

        return {
          body: blob.data,
          contentType,
        };
      },
      () => null
    );
  }

  try {
    const body = await fs.readFile(path.join(UPLOADS_DIR, key));
    return {
      body,
      contentType: localContentType(key),
    };
  } catch {
    return null;
  }
}
