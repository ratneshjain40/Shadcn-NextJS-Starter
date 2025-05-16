import { sql } from "drizzle-orm/sql";
import { index, int, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  tag: text().notNull().unique(),
  name: text().notNull(),
  category: text().notNull(),
  metalType: text().notNull(),
  grossWeight: real().notNull(),
  stoneWeight: real(),
  netWeight: real().notNull(),
  purity: real().notNull(),
  status: text().notNull().default("in-stock"),
  createdAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
},
  (table) => [
    uniqueIndex("tag_idx").on(table.tag),
    index("name_idx").on(table.name),
    index("category_idx").on(table.category),
    index("metalType_idx").on(table.metalType),
  ]
);

export const suppliersTable = sqliteTable("suppliers", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  phone: text().notNull().unique(),
  email: text(),
  address: text(),
  createdAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
});

export const purchasesTable = sqliteTable("purchases", {
  id: int().primaryKey({ autoIncrement: true }),
  itemId: int().references(() => itemsTable.id).unique(),
  supplierId: int().references(() => suppliersTable.id),
  netWeight: real().notNull(), // the net weight in grams which the supplier is charging for (can be different from the net weight of the item)
  rate_per_gram: real().notNull(),
  purchaseDate: text().notNull(),
  createdAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
},
  (table) => [
    uniqueIndex("itemId_idx").on(table.itemId),
    index("supplierId_idx").on(table.supplierId),
  ]
);

export const salesTable = sqliteTable("sales", {
  id: int().primaryKey({ autoIncrement: true }),
  itemId: int().references(() => itemsTable.id).unique(),
  purchaseId: int().references(() => purchasesTable.id).unique(),
  netWeight: real().notNull(), // the net weight in grams which the customer is buying (can be different from the net weight of the item)
  rate_per_gram: real().notNull(),
  createdAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
},
  (table) => [
    uniqueIndex("itemId_idx").on(table.itemId),
    uniqueIndex("purchaseId_idx").on(table.purchaseId),
  ]
);

