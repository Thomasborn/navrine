import { NextResponse } from "next/server";
import { getPostizIntegrations } from "@/lib/postiz";

export async function GET() {
  try {
    const channels = await getPostizIntegrations();
    return NextResponse.json({ ok: true, channels });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to load channels" },
      { status: 500 },
    );
  }
}
