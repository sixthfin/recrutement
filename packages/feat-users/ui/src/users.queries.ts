import { queryOptions } from "@tanstack/react-query";

import { initClient } from "@ts-rest/core";

import { UsersContract } from "@sixthfin-auth/feat-users-shared";
import { Module } from "@sixthfin-auth/core-shared";

export class UsersQueries extends Module<{ apiBaseUrl: string }> {
  readonly client = initClient(UsersContract, {
    baseUrl: this.deps.apiBaseUrl,
    jsonQuery: true,
  });

  listQuery() {
    return queryOptions({
      queryFn: () => this.client.list(),
      queryKey: [UsersQueries.name, this.listQuery.toString()],
    });
  }
}
