import type { Response } from "express";
import { z } from "zod/v4";

export type ValidatedResponse<TValidated, TResponseBody = unknown> = Response<
  TResponseBody,
  {
    validated: TValidated;
  }
>;

export const CategoriesEnum = z.enum(['Home', 'Electronics', 'Books']);

export type Categories = z.infer<typeof CategoriesEnum>;
