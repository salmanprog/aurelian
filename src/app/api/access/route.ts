import { NextResponse } from "next/server";
import { db } from "@/db";
import { accessRequests } from "@/db/schema";
import { ensureDatabaseReady } from "@/db/bootstrap";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; note?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email.includes("@")) {
      return NextResponse.json({ error: "invalid email" }, { status: 400 });
    }

    await ensureDatabaseReady();
    await db.insert(accessRequests).values({ email, note: body.note ?? null });

    return NextResponse.json({ ok: true, status: "under review" });
  } catch (error) {
    console.error("[aurelian] access", error);
    return NextResponse.json({ error: "house unreachable" }, { status: 500 });
  }
}
