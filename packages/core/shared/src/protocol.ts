import { z } from "zod";

import type { Simplify } from "./types.ts";

type WithId<Schema extends z.ZodObject<z.ZodRawShape>> =
  Schema extends z.ZodObject<infer Shape>
    ? z.ZodObject<Shape & { id: z.ZodString }>
    : never;

export function WithId<const Schema extends z.ZodObject<z.ZodRawShape>>(
  schema: Schema
): WithId<Schema> {
  return z.object({
    id: z.string(),
    ...schema.shape,
  }) as WithId<Schema>;
}

const PaginatedShape = {
  next: z.string().optional(),
  total: z.number(),
};

export type Infer<T> = Simplify<{
  [K in keyof T]: T[K] extends z.ZodType ? z.output<T[K]> : Infer<T[K]>;
}>;

type Paginated<Schema extends z.ZodObject<z.ZodRawShape>> = z.ZodObject<
  typeof PaginatedShape & {
    results: z.ZodArray<Schema>;
  }
>;

export function Paginated<const Schema extends z.ZodObject<z.ZodRawShape>>(
  schema: Schema
): Paginated<Schema> {
  return z.object({
    ...PaginatedShape,
    results: z.array(schema),
  });
}
