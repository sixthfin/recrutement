import { Module } from "@sixthfin-auth/core-shared";
import type { UsersModule } from "@sixthfin-auth/feat-users-api";
import { UsersContract } from "@sixthfin-auth/feat-users-shared";
import { initContract } from "@ts-rest/core";
import { initServer } from "@ts-rest/express";
import { z } from "zod";

const c = initContract();

export const ApiContract = c.router({
  health: {
    method: "GET",
    path: "/health",
    responses: {
      200: z.object({ status: z.literal("ok") }),
    },
  },
  users: UsersContract,
});

export class ApiRouter extends Module<{
  usersModule: UsersModule;
}> {
  router() {
    const s = initServer();
    return s.router(ApiContract, {
      health: async () => ({ status: 200, body: { status: "ok" } }),
      users: this.deps.usersModule.usersRouter,
    });
  }
}
