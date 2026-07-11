import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod/v4";

export function validateRequest(schema: ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        error: {
          message: "Validation error",
          details: result.error.flatten(),
        },
      });
    }

    res.locals.validated = result.data;

    return next();
  };
}
