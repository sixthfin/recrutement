import { z } from "zod";

import { protocol } from "@sixthfin-auth/core-shared";

const UserData = z.object({
  firstname: z.string(),
  lastname: z.string(),
});

const UserView = protocol.WithId(UserData);

export const UsersProtocol = {
  views: {
    default: UserView,
    list: protocol.Paginated(UserView),
  },
};

export type UsersProtocol = protocol.Infer<typeof UsersProtocol>;
