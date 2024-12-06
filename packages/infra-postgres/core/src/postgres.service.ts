import { drizzle } from "drizzle-orm/node-postgres";

import { Module } from "@sixthfin-auth/core-shared";

export interface PostgresConfiguration {
  readonly connectionString: string;
}

export class PostgresService extends Module<{
  postgresConfiguration: PostgresConfiguration;
}> {
  readonly db = drizzle(this.deps.postgresConfiguration.connectionString);
}
