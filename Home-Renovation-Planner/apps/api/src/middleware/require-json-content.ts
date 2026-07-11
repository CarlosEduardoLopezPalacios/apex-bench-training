import type { NextFunction, Request, Response } from "express";
import { HttpError } from "#app/utils/http-error";

function requestHasBody(req: Request) {
  const contentLength = Number(req.headers["content-length"] ?? 0);
  const usesChunkedTransfer = req.headers["transfer-encoding"] !== undefined;

  return contentLength > 0 || usesChunkedTransfer;
}

export function requireJsonContent(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (requestHasBody(req) && !req.is("application/json")) {
    return next(
      new HttpError(415, "Content-Type must be application/json")
    );
  }

  return next();
}
