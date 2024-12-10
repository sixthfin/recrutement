import { initServer } from "@ts-rest/express";

import { UsersContract } from "@sixthfin-auth/feat-users-shared";
import { Module, Result } from "@sixthfin-auth/core-shared";
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
      findOne: async (request) => {
        return this.deps.postgresService.db.transaction(async (transaction) => {
          const result = await this.deps.usersService.findOne(
            { transaction },
            request.params.userId
          );

          if (Result.isErr(result)) {
            return {
              status: 404,
              body: result.failure,
            };
          }

          return {
            status: 200,
            body: result.success,
          };
        });
      },
      create: async (request) => {
        return this.deps.postgresService.db.transaction(async (transaction) => {
          const result = await this.deps.usersService.create(
            { transaction },
            request.body
          );

          return {
            status: 201,
            body: result,
          };
        });
      },
      patch: async (request) => {
        return this.deps.postgresService.db.transaction(async (transaction) => {
          const result = await this.deps.usersService.patch(
            { transaction },
            request.params.userId,
            request.body
          );

          if (Result.isErr(result)) {
            return {
              status: 404,
              body: result.failure,
            };
          }

          return {
            status: 200,
            body: result.success,
          };
        });
      },
    });
  }
}
