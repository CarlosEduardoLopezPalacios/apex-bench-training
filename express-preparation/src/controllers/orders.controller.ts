import type { Request, Response, NextFunction } from "express";
import { getOrderDetailsById, getOrdersList } from "../services/orders.service";
import { ValidatedResponse } from "../schemas/globals";
import { OrderDetailsRequest, OrderDetailsResponse, OrderListRequest, OrderListResponse } from "../schemas/orders.schema";

export function listOrders(_req: Request, res: ValidatedResponse<OrderListRequest, OrderListResponse>, next: NextFunction) {
  try {
    const orders = getOrdersList();

    return res.status(200).json({ orders });
    
  } catch (err) {
    next(err);
  }
}

export function getOrderById(_req: Request, res: ValidatedResponse<OrderDetailsRequest, OrderDetailsResponse>, next: NextFunction) {
  try {
    const { params: { id } } = res.locals.validated;
    const order = getOrderDetailsById(id);
    return res.status(200).json({ order });
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
