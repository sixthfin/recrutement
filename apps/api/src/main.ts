import { z } from "zod";
import express from "express";
import cors from "cors";
import { createExpressEndpoints } from "@ts-rest/express";

import { UsersModule } from "@sixthfin-auth/feat-users-api";
import { PostgresDefaultDbModule } from "@sixthfin-auth/infra-postgres-default-db";

import { ApiContract, ApiRouter } from "./router.ts";

function boot() {
  const configuration = Configuration.parse(process.env);

  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());

  const postgresDefaultDbModule = new PostgresDefaultDbModule({
    postgresConfiguration: {
      connectionString: configuration.DATABASE_URL,
    },
  });

  const usersModule = new UsersModule(postgresDefaultDbModule);

  const apiRouter = new ApiRouter({
    usersModule,
  }).router();

  createExpressEndpoints(ApiContract, apiRouter, app, {
    logInitialization: true,
    jsonQuery: true,
  });

  app.listen(configuration.SERVER_PORT, () => {
    console.info(`Server started on ${configuration.SERVER_PORT}`);
  });
}

const Configuration = z.object({
  SERVER_HOST: z.string(),
  SERVER_PORT: z.coerce.number(),

  DATABASE_URL: z.string(),
});

boot();
