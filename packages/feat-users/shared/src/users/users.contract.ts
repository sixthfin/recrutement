import { initContract } from "@ts-rest/core";

import { UsersProtocol } from "./users.protocol.ts";

const c = initContract();

export const UsersContract = c.router(
  {
    create: {
      body: UsersProtocol.commands.create,
      method: "POST",
      path: "/",
      responses: {
        201: UsersProtocol.views.default,
      },
    },
    findOne: {
      method: "GET",
      path: "/:userId",
      responses: {
        200: UsersProtocol.views.detailed,
        404: UsersProtocol.errors.unknown,
      },
    },
    list: {
      method: "GET",
      path: "/",
      responses: {
        200: UsersProtocol.views.list,
      },
    },
    patch: {
      body: UsersProtocol.commands.patch,
      method: "PATCH",
      path: "/:userId",
      responses: {
        200: UsersProtocol.views.default,
        404: UsersProtocol.errors.unknown,
      },
    },
  },
  {
    pathPrefix: "/users",
    strictStatusCodes: true,
  }
);
