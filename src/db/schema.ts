import {
  boolean,
  int,
  json,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export type ProductImage = {
  src: string;
  alt: string;
  /** object-position for editorial cropping */
  focus?: string;
};

export type SpecRow = { label: string; value: string };

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  objectNo: varchar("object_no", { length: 12 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  category: varchar("category", { length: 60 }).notNull(),
  collection: varchar("collection", { length: 80 }).notNull(),
  drop: varchar("drop", { length: 40 }).notNull(),
  material: varchar("material", { length: 60 }).notNull(),
  price: int("price").notNull(),
  edition: varchar("edition", { length: 80 }).notNull(),
  stock: int("stock").notNull().default(0),
  limited: boolean("limited").notNull().default(false),
  sortOrder: int("sort_order").notNull().default(0),
  tagline: text("tagline").notNull(),
  story: text("story").notNull(),
  whyItExists: text("why_it_exists").notNull(),
  materialNote: text("material_note").notNull(),
  fit: text("fit").notNull(),
  dropNote: text("drop_note").notNull(),
  images: json("images").$type<ProductImage[]>().notNull(),
  specs: json("specs").$type<SpecRow[]>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const journalPosts = mysqlTable("journal_posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  kicker: varchar("kicker", { length: 80 }).notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: json("body").$type<string[]>().notNull(),
  image: varchar("image", { length: 300 }).notNull(),
  readTime: varchar("read_time", { length: 24 }).notNull(),
  chapter: varchar("chapter", { length: 24 }).notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: int("sort_order").notNull().default(0),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const subscribers = mysqlTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  source: varchar("source", { length: 60 }).notNull().default("house"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const accessRequests = mysqlTable("access_requests", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 32 }).notNull().unique(),
  email: varchar("email", { length: 200 }).notNull(),
  subtotal: int("subtotal").notNull(),
  shipping: int("shipping").notNull().default(0),
  total: int("total").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("reserved"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = mysqlTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: int("order_id").notNull(),
  productSlug: varchar("product_slug", { length: 120 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  objectNo: varchar("object_no", { length: 12 }).notNull(),
  quantity: int("quantity").notNull(),
  price: int("price").notNull(),
});

export type Product = typeof products.$inferSelect;
export type JournalPost = typeof journalPosts.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
