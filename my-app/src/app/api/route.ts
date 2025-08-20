// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PostRepository } from "@repositories/PostRepository";

const repo = new PostRepository();

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const data = await request.json();
  try {
    const updated = await repo.update(Number(params.id), data);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Error al actualizar post" }, { status: 500 });
  }
}
