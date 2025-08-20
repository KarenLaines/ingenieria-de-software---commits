
import pool from "@libs/db";

export class Post {
  constructor(
    public title: string,
    public description: string,
    public author: string
  ) {}

  async save() {
    const result = await pool.query(
      "INSERT INTO posts (title, description, author) VALUES ($1, $2, $3) RETURNING *",
      [this.titulo, this.description, this.author]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
  }

  static async getById(id: number) {
    const result = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
    return result.rows[0];
  }

  static async update(id: number, data: Partial<Post>) {
    const { title, description, author } = data;
    const result = await pool.query(
      "UPDATE posts SET title=$1, description=$2, author=$3 WHERE id=$4 RETURNING *",
      [title, description, author, id]
    );
    return result.rows[0];
  }

  static async delete(id: number) {
    const result = await pool.query("DELETE FROM posts WHERE id=$1 RETURNING *", [id]);
    return result.rows[0];
  }
}
