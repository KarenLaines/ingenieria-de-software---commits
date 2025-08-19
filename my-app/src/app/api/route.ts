import { NextRequest, NextResponse } from "next/server";




export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    isValid(data);

    return NextResponse.json(
      { message: "Validated data", data },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

// --------------------------
// VALIDATIONS
// --------------------------
function isValid(post: { titulo: string; description: string; author: string }) {
  validateTitle(post.titulo);
  validateDescription(post.description);
  validateAuthor(post.author);
}

function validateTitle(titulo: string) {
  if (typeof titulo !== "string" || titulo.trim().length === 0 || titulo.length > 40) {
    throw new Error("El título es obligatorio y debe tener máximo 40 caracteres.");
  }
}

function validateDescription(description: string) {
  if (typeof description !== "string" || description.trim().length < 10) {
    throw new Error("La descripción es obligatoria y debe tener al menos 10 caracteres.");
  }
}

function validateAuthor(author: string) {
  if (typeof author !== "string" || author.trim().length === 0 || author.length > 30) {
    throw new Error("El autor es obligatorio y debe tener máximo 30 caracteres.");
  }
}
