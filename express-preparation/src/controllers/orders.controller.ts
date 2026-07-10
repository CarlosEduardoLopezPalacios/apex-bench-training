import type { Request, Response, NextFunction } from "express";
import { getOrderDetailsById, getOrdersList, getTotalOrdersByCategory, createOrder as createOrderService } from "../services/orders.service";
import { ValidatedResponse } from "../schemas/globals";
import { CreateOrderRequest, CreateOrderResponse, OrderDetailsRequest, OrderDetailsResponse, OrderListRequest, OrderListResponse, OrderTotalsByCategoryRequest, OrderTotalsByCategoryResponse } from "../schemas/orders.schema";

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

export async function getTotalsByCategory(_req: Request, res: ValidatedResponse<OrderTotalsByCategoryRequest, OrderTotalsByCategoryResponse>, next: NextFunction) {
  try {
    const totals = getTotalOrdersByCategory();
    return res.status(200).json(totals as OrderTotalsByCategoryResponse);
  } catch (err) {
    next(err);
  }
}

export function createOrder(_req: Request, res: ValidatedResponse<CreateOrderRequest, CreateOrderResponse>, next: NextFunction) {
  try {
    const { body: order } = res.locals.validated;
    const createdOrder = createOrderService(order);
    return res.status(201).json(createdOrder);
  } catch (err) {
    next(err);
  }
}
