import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Producto {
  id: number;
  categoria_id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  imagen: string | null;
  creado_en: Date;
}

export async function getProductos(): Promise<Producto[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM productos");
  return rows as Producto[];
}

export async function getProductoById(id: number): Promise<Producto | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM productos WHERE id = ?",
    [id]
  );
  return (rows[0] as Producto) ?? null;
}

export async function getProductosByCategoria(
  categoria_id: number
): Promise<Producto[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM productos WHERE categoria_id = ?",
    [categoria_id]
  );
  return rows as Producto[];
}

export async function createProducto(
  categoria_id: number,
  nombre: string,
  descripcion: string | null,
  precio: number,
  imagen: string | null
): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO productos (categoria_id, nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?, ?)",
    [categoria_id, nombre, descripcion, precio, imagen]
  );
  return result.insertId;
}

export async function deleteProducto(id: number): Promise<void> {
  await pool.query("DELETE FROM productos WHERE id = ?", [id]);
}
