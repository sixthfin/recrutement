import type { ApiContext } from "@sixthfin-auth/core-api";
import type { UsersProtocol } from "@sixthfin-auth/feat-users-shared";

export interface UsersStore {
  list(context: ApiContext): Promise<UsersProtocol["views"]["list"]>;
}
