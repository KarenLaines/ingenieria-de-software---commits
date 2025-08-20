import pool from "@src/libs/db";

export async function createPost(titulo: string, description: string, author: string) {
  const result = await pool.query(
    "INSERT INTO posts (title, description, author) VALUES ($1, $2, $3) RETURNING *",
    [titulo, description, author]
  );
  return result.rows[0];
}
