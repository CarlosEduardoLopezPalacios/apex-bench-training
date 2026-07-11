import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

type ValidatedRequest = Pick<Request, "body" | "params" | "query">;

export function validateRequest(schema: ZodSchema) {
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

    const validated = result.data as Partial<ValidatedRequest>;

    req.body = validated.body ?? req.body;
    req.params = validated.params ?? req.params;
    req.query = validated.query ?? req.query;

    return next();
  };
}
