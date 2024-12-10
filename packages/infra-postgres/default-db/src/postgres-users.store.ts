import { nanoid } from "nanoid";
import { count, eq, sql } from "drizzle-orm";

import type { UsersProtocol } from "@sixthfin-auth/feat-users-shared";
import type { UsersStore } from "@sixthfin-auth/feat-users-api";
import { Result } from "@sixthfin-auth/core-shared";
import type { ApiContext } from "@sixthfin-auth/core-api";

import { groupMemberships, groups, users } from "./schema.ts";

export class PostgresUsersStore implements UsersStore {
  async create(
    context: ApiContext,
    command: UsersProtocol["commands"]["create"]
  ): Promise<UsersProtocol["views"]["default"]> {
    const [result] = await context.transaction
      .insert(users)
      .values({ id: nanoid(), ...command })
      .returning();

    if (result === undefined) {
      throw new Error(
        `An unexpected error occured while trying to create user ${command.firstname} ${command.lastname}`
      );
    }

    return result;
  }

  async findOne(
    context: ApiContext,
    userId: string
  ): Promise<
    Result<
      UsersProtocol["errors"]["unknown"],
      UsersProtocol["views"]["detailed"]
    >
  > {
    const [result] = await context.transaction
      .select({
        firstname: users.firstname,
        groups: sql<string[]>`JSON_AGG(${groups.name} ORDER BY ${groups.name})`,
        id: users.id,
        lastname: users.lastname,
      })
      .from(users)
      .innerJoin(groupMemberships, eq(groupMemberships.userId, users.id))
      .leftJoin(groups, eq(groups.id, groupMemberships.groupId))
      .where(eq(users.id, userId))
      .groupBy(users.id, users.firstname, users.lastname);

    if (result === undefined) {
      return Result.err({ code: "unknown-user" });
    }

    return Result.ok(result);
  }

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

  async patch(
    context: ApiContext,
    userId: string,
    command: UsersProtocol["commands"]["patch"]
  ): Promise<
    Result<
      UsersProtocol["errors"]["unknown"],
      UsersProtocol["views"]["default"]
    >
  > {
    const update = command.reduce(
      (update, { path, value }) => {
        update[path.slice(0, 1) as keyof UsersProtocol["commands"]["create"]] =
          value;
        return update;
      },
      {} as Partial<UsersProtocol["commands"]["create"]>
    );

    const [result] = await context.transaction
      .update(users)
      .set(update)
      .where(eq(users.id, userId))
      .returning();

    if (result === undefined) {
      return Result.err({ code: "unknown-user" });
    }

    return Result.ok(result);
  }
}
