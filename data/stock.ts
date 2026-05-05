import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Stock {
  id: number;
  producto_id: number;
  talla: string | null;
  color: string | null;
  cantidad: number;
}

export async function getStockByProducto(producto_id: number): Promise<Stock[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM stock WHERE producto_id = ?",
    [producto_id]
  );
  return rows as Stock[];
}

export async function getStockById(id: number): Promise<Stock | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM stock WHERE id = ?",
    [id]
  );
  return (rows[0] as Stock) ?? null;
}

export async function createStock(
  producto_id: number,
  talla: string | null,
  color: string | null,
  cantidad: number
): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO stock (producto_id, talla, color, cantidad) VALUES (?, ?, ?, ?)",
    [producto_id, talla, color, cantidad]
  );
  return result.insertId;
}

export async function updateCantidadStock(
  id: number,
  cantidad: number
): Promise<void> {
  await pool.query("UPDATE stock SET cantidad = ? WHERE id = ?", [cantidad, id]);
}

export async function deleteStock(id: number): Promise<void> {
  await pool.query("DELETE FROM stock WHERE id = ?", [id]);
}
