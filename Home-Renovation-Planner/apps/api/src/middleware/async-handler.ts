import type { NextFunction, Request, Response } from "express";

type AsyncRequestHandler<Locals extends Record<string, unknown>> = (
  req: Request,
  res: Response<unknown, Locals>,
  next: NextFunction
) => Promise<void>;

export function asyncHandler<Locals extends Record<string, unknown>>(
  handler: AsyncRequestHandler<Locals>
) {
  return (req: Request, res: Response<unknown, Locals>, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
