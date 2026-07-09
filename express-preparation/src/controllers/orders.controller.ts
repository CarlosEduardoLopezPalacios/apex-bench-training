import type { Request, Response, NextFunction } from "express";

export async function listOrders(_req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 6
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 7
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}

export async function getTotalsByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 8
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 9
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}
