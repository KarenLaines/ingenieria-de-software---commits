// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { PostRepository } from "@repositories/posts_repository";

const repo = new PostRepository();

export async function GET() {
  try {
    const posts = await repo.getAll();
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: "Error to get posts" }, { status: 500 });
  }
}
