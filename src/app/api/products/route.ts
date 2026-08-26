import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");
  const material = searchParams.get("material");
  const maxPrice = searchParams.get("maxPrice");

  let items = await getProducts();

  if (collection && collection !== "all") {
    items = items.filter((item) => item.collection === collection);
  }
  if (material && material !== "all") {
    items = items.filter((item) => item.material === material);
  }
  if (maxPrice) {
    const ceiling = Number(maxPrice);
    if (!Number.isNaN(ceiling)) items = items.filter((item) => item.price <= ceiling);
  }

  return NextResponse.json({ count: items.length, items });
}
