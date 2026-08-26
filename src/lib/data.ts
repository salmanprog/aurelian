import { asc, desc, eq, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { journalPosts, products } from "@/db/schema";
import { ensureDatabaseReady } from "@/db/bootstrap";
import type { JournalPost, Product } from "@/db/schema";

/**
 * Guarantees the schema exists and the catalogue is populated.
 * Safe to call on every request — the work happens once per process.
 */
export async function ensureSeeded() {
  return ensureDatabaseReady();
}

export async function getProducts(): Promise<Product[]> {
  await ensureSeeded();
  return db.select().from(products).orderBy(asc(products.sortOrder));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureSeeded();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getRelatedProducts(slug: string, limit = 3) {
  await ensureSeeded();
  return db
    .select()
    .from(products)
    .where(ne(products.slug, slug))
    .orderBy(asc(products.sortOrder))
    .limit(limit);
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  await ensureSeeded();
  return db
    .select()
    .from(journalPosts)
    .orderBy(asc(journalPosts.sortOrder), desc(journalPosts.publishedAt));
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  await ensureSeeded();
  const rows = await db
    .select()
    .from(journalPosts)
    .where(eq(journalPosts.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

export async function getHouseStats() {
  await ensureSeeded();
  const [row] = await db
    .select({
      objects: sql<number>`count(*)`,
      remaining: sql<number>`coalesce(sum(${products.stock}), 0)`,
    })
    .from(products);
  return row ?? { objects: 0, remaining: 0 };
}
