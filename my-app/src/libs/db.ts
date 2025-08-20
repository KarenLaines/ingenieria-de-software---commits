import { Pool } from "pg";
import * as dotenv from "dotenv";

import { NextRequest, NextResponse } from "next/server";

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default pool;

// probar base de datos

export async function GET() {
  try {
    // Probar conexión
    const result = await pool.query("SELECT NOW()"); 
    return NextResponse.json({ message: "Conexión exitosa 🚀", time: result.rows[0] });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
