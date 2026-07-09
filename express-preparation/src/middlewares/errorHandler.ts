import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError";
import { HttpError } from "../utils/http-error";

export const errorHandler: ErrorRequestHandler<{}, { error: { message: string } }> = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: { message: err.message } });
  }

  return res.status(500).json({ error: { message: "Internal server error" } });
};
