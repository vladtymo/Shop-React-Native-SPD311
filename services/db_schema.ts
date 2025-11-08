import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
});

// Export Product to use as an interface in your app
export type Product = typeof productsTable.$inferSelect;
