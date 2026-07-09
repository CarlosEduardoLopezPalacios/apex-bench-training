import type { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod/v4";

export const validateRequest = (schema: ZodObject) => {
    return (req: Request, response: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        if (!result.success) {
            return response.status(400).json({
                error: {
                    message: 'Validation error',
                    details: result.error.flatten(),
                }
            });
        }
        
        response.locals.validated = result.data;
        return next();
    }
}
