import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { ensureDatabaseReady } from "@/db/bootstrap";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email.includes("@") || email.length < 5) {
      return NextResponse.json({ error: "invalid email" }, { status: 400 });
    }

    await ensureDatabaseReady();
    await db
      .insert(subscribers)
      .values({ email, source: body.source ?? "house" })
      .onDuplicateKeyUpdate({ set: { email } });

    return NextResponse.json({ ok: true, email });
  } catch (error) {
    console.error("[aurelian] newsletter", error);
    return NextResponse.json({ error: "house unreachable" }, { status: 500 });
  }
}
