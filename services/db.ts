import { Product } from "@/app/models/Product";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("items.db");

export async function init() {
  await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL);`);

  const count = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM products"
  );

  if (count?.count === 0) {
    await db.execAsync(`
                INSERT INTO products (title) VALUES ('Banana');
                INSERT INTO products (title) VALUES ('Mango');
                INSERT INTO products (title) VALUES ('Watermelon');`);
  }
}

export async function addItem(title: string): Promise<Product> {
  const result = await db.runAsync(`INSERT INTO products (title) VALUES (?);`, [
    title,
  ]);
  return { id: result.lastInsertRowId, title } as Product;
}

export async function deleteItem(id: number) {
  await db.runAsync(`DELETE FROM products where id = ?;`, [id]);
}

export async function updateItem(item: Product) {
  await db.runAsync(`UPDATE products set title = ? where id = ?;`, [
    item.title,
    item.id,
  ]);
}

export async function getItems() {
  return await db.getAllAsync<Product>("SELECT * FROM products");
}
