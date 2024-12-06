import type { ApiContext } from "@sixthfin-auth/core-api";
import type { UsersStore } from "@sixthfin-auth/feat-users-api";
import type { UsersProtocol } from "@sixthfin-auth/feat-users-shared";
import { users } from "./schema.ts";
import { count } from "drizzle-orm";

export class PostgresUsersStore implements UsersStore {
  async list(context: ApiContext): Promise<UsersProtocol["views"]["list"]> {
    const results = await context.transaction.select().from(users);
    const total = await context.transaction
      .select({ count: count() })
      .from(users);

    return {
      results,
      total: total[0]?.count ?? 0,
    };
  }
}
