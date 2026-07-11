import type { NextFunction, Request, Response } from "express";
import { HttpError } from "#app/utils/http-error";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (
    error instanceof Error &&
    "type" in error &&
    error.type === "entity.too.large"
  ) {
    return res.status(413).json({
      error: {
        message: "Payload too large",
      },
    });
  }

  if (
    error instanceof SyntaxError &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    return res.status(400).json({
      error: {
        message: "Invalid JSON payload",
      },
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }

  console.error(error);

  return res.status(500).json({
    error: {
      message: "Internal server error",
    },
  });
}
