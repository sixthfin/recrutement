import z from "zod";

import { defineConfig } from "drizzle-kit";

const Configuration = z.object({
  DATABASE_URL: z.string(),
});

const configuration = Configuration.parse(process.env);

export default defineConfig({
  dbCredentials: {
    url: configuration.DATABASE_URL,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema.ts",
});
