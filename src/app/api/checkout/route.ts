import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { ensureDatabaseReady } from "@/db/bootstrap";

export const dynamic = "force-dynamic";

type IncomingItem = {
  slug: string;
  name: string;
  objectNo: string;
  price: number;
  quantity: number;
};

function reference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const noise = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `AUR-${stamp}${noise}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; items?: IncomingItem[] };
    const items = (body.items ?? []).filter((item) => item.quantity > 0);
    if (items.length === 0) {
      return NextResponse.json({ error: "empty bag" }, { status: 400 });
    }

    await ensureDatabaseReady();

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 250 ? 0 : 18;
    const total = subtotal + shipping;
    const ref = reference();

    const [order] = await db
      .insert(orders)
      .values({
        reference: ref,
        email: (body.email ?? "house@aurelian.co").toLowerCase(),
        subtotal,
        shipping,
        total: subtotal + shipping,
        status: "reserved",
      })
      .$returningId();

    await db.insert(orderItems).values(
      items.map((item) => ({
        orderId: order.id,
        productSlug: item.slug,
        name: item.name,
        objectNo: item.objectNo,
        quantity: item.quantity,
        price: item.price,
      })),
    );

    return NextResponse.json({
      ok: true,
      reference: ref,
      total,
      shipping,
    });
  } catch (error) {
    console.error("[aurelian] checkout", error);
    return NextResponse.json({ error: "reservation failed" }, { status: 500 });
  }
}
