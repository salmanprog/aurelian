import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { ShopExperience } from "@/components/shop/ShopExperience";
import { Footer } from "@/components/site/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop the house — AURELIAN",
  description:
    "Eight objects. Numbered runs. Bracelets, wallets, journals, hats and the Obsidian Cuff, released in chapters.",
};

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <ShopExperience products={products} />
      <Footer />
    </>
  );
}
