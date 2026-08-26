import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { ProductView } from "@/components/object/ProductView";
import { Footer } from "@/components/site/Footer";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Object not found — AURELIAN" };
  return {
    title: `${product.name} — Object ${product.objectNo} — AURELIAN`,
    description: `${product.tagline} ${product.edition}. ${product.materialNote.slice(0, 120)}`,
  };
}

export default async function ObjectPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(slug, 3);

  return (
    <>
      <ProductView product={product} related={related} />
      <Footer />
    </>
  );
}
