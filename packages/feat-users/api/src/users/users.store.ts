import type { ApiContext } from "@sixthfin-auth/core-api";
import type { Result } from "@sixthfin-auth/core-shared";
import type { UsersProtocol } from "@sixthfin-auth/feat-users-shared";

export interface UsersStore {
  list(context: ApiContext): Promise<UsersProtocol["views"]["list"]>;
  create(
    context: ApiContext,
    command: UsersProtocol["commands"]["create"]
  ): Promise<UsersProtocol["views"]["default"]>;
  patch(
    context: ApiContext,
    userId: string,
    command: UsersProtocol["commands"]["patch"]
  ): Promise<
    Result<
      UsersProtocol["errors"]["unknown"],
      UsersProtocol["views"]["default"]
    >
  >;
  findOne(
    context: ApiContext,
    userId: string
  ): Promise<
    Result<
      UsersProtocol["errors"]["unknown"],
      UsersProtocol["views"]["detailed"]
    >
  >;
}
