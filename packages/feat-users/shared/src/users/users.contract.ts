import { initContract } from "@ts-rest/core";

import { UsersProtocol } from "./users.protocol.ts";

const c = initContract();

export const UsersContract = c.router(
  {
    list: {
      method: "GET",
      path: "/",
      responses: {
        200: UsersProtocol.views.list,
      },
    },
  },
  {
    pathPrefix: "/users",
    strictStatusCodes: true,
  }
);
