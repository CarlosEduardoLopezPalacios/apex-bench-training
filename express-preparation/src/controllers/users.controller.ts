import type { Request, Response, NextFunction } from "express";

export async function listUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 10
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 10
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 10
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}
