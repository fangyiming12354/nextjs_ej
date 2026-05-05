import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
}

export async function getCategorias(): Promise<Categoria[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM categorias");
  return rows as Categoria[];
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM categorias WHERE slug = ?",
    [slug]
  );
  return (rows[0] as Categoria) ?? null;
}

export async function createCategoria(
  nombre: string,
  slug: string
): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO categorias (nombre, slug) VALUES (?, ?)",
    [nombre, slug]
  );
  return result.insertId;
}

export async function deleteCategoria(id: number): Promise<void> {
  await pool.query("DELETE FROM categorias WHERE id = ?", [id]);
}
