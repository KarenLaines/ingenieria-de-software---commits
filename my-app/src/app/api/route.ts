import { NextRequest, NextResponse } from "next/server";
import pool from "@/libs/db" //  conexión a PostgreSQL


export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    // Validar datos
    isValid(data);

    // Insertar en la base de datos
    const query = `
      INSERT INTO posts (title, description, author)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [data.title, data.description, data.author];
    const result = await pool.query(query, values);

    return NextResponse.json(
      { message: "Post created 🚀", post: result.rows[0] },
      { status: 201 }
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
function isValid(post: { title: string; description: string; author: string }) {
  validateTitle(post.title);
  validateDescription(post.description);
  validateAuthor(post.author);
}

function validateTitle(title: string) {
  if (typeof title !== "string" || title.trim().length === 0 || title.length > 40) {
    throw new Error("Title is required and must be at most 40 characters.");
  }
}

function validateDescription(description: string) {
  if (typeof description !== "string" || description.trim().length < 10) {
    throw new Error("Description is required and must be at least 10 characters.");
  }
}

function validateAuthor(author: string) {
  if (typeof author !== "string" || author.trim().length === 0 || author.length > 30) {
    throw new Error("Author is required and must be at most 30 characters.");
  }
}
