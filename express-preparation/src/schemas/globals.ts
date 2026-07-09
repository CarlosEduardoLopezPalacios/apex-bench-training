import type { Response } from "express";

export type ValidatedResponse<TValidated, TResponseBody = unknown> = Response<
  TResponseBody,
  {
    validated: TValidated;
  }
>;
