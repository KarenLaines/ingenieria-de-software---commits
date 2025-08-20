// repositories/PostRepository.ts
import pool from "@/libs/db";

export class PostRepository {
  async create(titulo: string, description: string, author: string) {
    const result = await pool.query(
      "INSERT INTO posts (title, description, author) VALUES ($1, $2, $3) RETURNING *",
      [titulo, description, author]
    );
    return result.rows[0];
  }

  async getAll() {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
  }


