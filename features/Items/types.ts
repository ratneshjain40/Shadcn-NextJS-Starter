import { itemsTable } from "@/db/schema";

// type Item = {
//     id: number;
//     tag: string;
//     name: string;
//     category: string;
//     metalType: string;
//     grossWeight: number;
//     stoneWeight: number | null;
//     netWeight: number;
//     purity: number;
//     status: string;
//     createdAt: string;
// }

export type Item = typeof itemsTable.$inferSelect;
export type ItemInsert = typeof itemsTable.$inferInsert;
export type ItemUpdate = Omit<Partial<ItemInsert>, "id">;
