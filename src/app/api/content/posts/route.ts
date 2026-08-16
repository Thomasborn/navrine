import { NextRequest, NextResponse } from "next/server";
import { createPostizPost, getPostizPosts } from "@/lib/postiz";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const posts = await getPostizPosts({
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
    });
    return NextResponse.json({ ok: true, posts });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to load posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.integrationId || !body?.content || !body?.date) {
      return NextResponse.json(
        { ok: false, error: "integrationId, content, and date are required" },
        { status: 400 },
      );
    }

    const post = await createPostizPost({
      integrationId: body.integrationId,
      content: body.content,
      date: body.date,
      mode: body.mode,
      settings: body.settings,
      images: body.images,
    });

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to create post" },
      { status: 500 },
    );
  }
}
