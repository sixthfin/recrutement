import { Module } from "@sixthfin-auth/core-shared";
import {
  type PostgresConfiguration,
  PostgresService,
} from "@sixthfin-auth/infra-postgres-core";

import { PostgresUsersStore } from "./postgres-users.store.ts";

export class PostgresDefaultDbModule extends Module<{
  postgresConfiguration: PostgresConfiguration;
}> {
  readonly postgresService = new PostgresService(this.deps);
  readonly usersStore = new PostgresUsersStore();
}
