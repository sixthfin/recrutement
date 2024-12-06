import { Module } from "@sixthfin-auth/core-shared";

import { UsersRouter } from "./users.router.ts";
import { UsersService } from "./users.service.ts";
import type { UsersStore } from "./users.store.ts";
import type { PostgresService } from "../../../../infra-postgres/core/src/postgres.service.ts";

export class UsersModule extends Module<{
  usersStore: UsersStore;
  postgresService: PostgresService;
}> {
  readonly usersService = new UsersService(this.deps);
  readonly usersRouter = new UsersRouter({ ...this.deps, ...this }).router();
}
