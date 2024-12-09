CREATE TABLE IF NOT EXISTS "group_memberships" (
    "group_id" text NOT NULL,
    "user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
    "id" text PRIMARY KEY NOT NULL,
    "name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
    "firstname" text NOT NULL,
    "id" text PRIMARY KEY NOT NULL,
    "lastname" text NOT NULL
);
