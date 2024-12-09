import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  firstname: text("firstname").notNull(),
  id: text("id").primaryKey(),
  lastname: text("lastname").notNull(),
});

export type UserRow = typeof users.$inferSelect;
