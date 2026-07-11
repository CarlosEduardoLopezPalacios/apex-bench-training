import type { Response } from "express";
import { z } from "zod/v4";

export type ValidatedResponse<TValidated, TResponseBody> = Response<
  TResponseBody,
  { validated: TValidated }
>;

export const uuidSchema = z.uuid("Invalid UUID");

export const emptyRequestPart = z.strictObject({}).optional();

export const moneyStringSchema = z
  .string()
  .trim()
  .regex(/^\d{1,12}(\.\d{1,2})?$/, "Invalid monetary amount");
