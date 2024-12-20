import { initServer } from "@ts-rest/express";

import { UsersContract } from "@sixthfin-auth/feat-users-shared";
import { Module } from "@sixthfin-auth/core-shared";
import { PostgresService } from "@sixthfin-auth/infra-postgres-core";

import type { UsersService } from "./users.service.ts";

export class UsersRouter extends Module<{
  usersService: UsersService;
  postgresService: PostgresService;
}> {
  router() {
    const s = initServer();
    return s.router(UsersContract, {
      list: async () => {
        return this.deps.postgresService.db.transaction(async (transaction) => {
          const result = await this.deps.usersService.list({ transaction });

          return {
            status: 200,
            body: result,
          };
        });
      },
    });
  }
}
