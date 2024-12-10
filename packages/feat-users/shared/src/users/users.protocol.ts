import { z } from "zod";

import { protocol } from "@sixthfin-auth/core-shared";

const UserData = z.object({
  firstname: z.string(),
  lastname: z.string(),
});

const UserView = protocol.WithId(UserData);

export const UsersProtocol = {
  commands: {
    create: UserData,
    patch: z.array(
      z.object({
        op: z.literal("replace"),
        path: z.enum(["/firstname", "/lastname"]),
        value: z.string(),
      })
    ),
  },
  errors: {
    unknown: z.object({
      code: z.literal("unknown-user"),
    }),
  },
  views: {
    default: UserView,
    detailed: z.object({
      ...UserView.shape,
      groups: z.string().array(),
    }),
    list: protocol.Paginated(UserView),
  },
};

export type UsersProtocol = protocol.Infer<typeof UsersProtocol>;
