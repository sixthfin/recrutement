import { pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  firstname: text("firstname").notNull(),
  id: text("id").primaryKey(),
  lastname: text("lastname").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  groupMemberships: many(groupMemberships),
}));

export type UserRow = typeof users.$inferSelect;

export const groups = pgTable("groups", {
  id: text("id").primaryKey(),
  name: text("name"),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  groupMemberships: many(groupMemberships),
}));

export type GroupRow = typeof groups.$inferSelect;

export const groupMemberships = pgTable("group_memberships", {
  groupId: text("group_id").notNull(),
  userId: text("user_id").notNull(),
});

export const groupMembershipsRelations = relations(
  groupMemberships,
  ({ one }) => ({
    groups: one(groups, {
      fields: [groupMemberships.groupId],
      references: [groups.id],
    }),
    users: one(users, {
      fields: [groupMemberships.userId],
      references: [users.id],
    }),
  })
);

export type GroupMembershipRow = typeof groupMemberships.$inferSelect;
