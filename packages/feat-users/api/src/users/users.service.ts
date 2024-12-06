import type { ApiContext } from "@sixthfin-auth/core-api";
import { Module } from "@sixthfin-auth/core-shared";

import type { UsersProtocol } from "@sixthfin-auth/feat-users-shared";

import type { UsersStore } from "./users.store.ts";

export class UsersService extends Module<{ usersStore: UsersStore }> {
  async list(context: ApiContext): Promise<UsersProtocol["views"]["list"]> {
    const results = await this.deps.usersStore.list(context);

    return results;
  }
}
