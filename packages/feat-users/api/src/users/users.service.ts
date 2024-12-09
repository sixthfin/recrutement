import type { ApiContext } from "@sixthfin-auth/core-api";
import { Module, Result } from "@sixthfin-auth/core-shared";

import type { UsersProtocol } from "@sixthfin-auth/feat-users-shared";

import type { UsersStore } from "./users.store.ts";

export class UsersService extends Module<{ usersStore: UsersStore }> {
  async list(context: ApiContext): Promise<UsersProtocol["views"]["list"]> {
    const results = await this.deps.usersStore.list(context);

    return results;
  }

  async create(
    context: ApiContext,
    command: UsersProtocol["commands"]["create"]
  ): Promise<UsersProtocol["views"]["default"]> {
    const result = await this.deps.usersStore.create(context, command);

    return result;
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
    const result = await this.deps.usersStore.patch(context, userId, command);

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
    const result = await this.deps.usersStore.findOne(context, userId);

    return result;
  }
}
