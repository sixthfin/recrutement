import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export interface ApiContext {
  transaction: Parameters<Parameters<PostgresJsDatabase["transaction"]>[0]>[0];
}
