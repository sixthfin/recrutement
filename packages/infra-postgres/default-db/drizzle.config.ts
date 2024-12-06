import { defineConfig } from "drizzle-kit";
import z from "zod";

const Configuration = z.object({
  DATABASE_URL: z.string(),
});

const configuration = Configuration.parse(process.env);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: configuration.DATABASE_URL,
  },
});
