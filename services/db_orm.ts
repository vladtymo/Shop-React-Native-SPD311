import { Product } from "@/app/models/Product";
import * as schema from "@/services/db_schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { productsTable } from "./db_schema";

type DrizzleDb = ExpoSQLiteDatabase<typeof schema> & {
  $client: SQLiteDatabase;
};

export async function addItem(db: DrizzleDb, text: string): Promise<Product> {
  const result = await db.insert(productsTable).values({ title: text });
  return { id: Number(result.lastInsertRowId), title: text } as Product;
}
