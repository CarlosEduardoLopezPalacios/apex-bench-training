import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getTotalsByCategory,
  listOrders,
} from "../controllers/orders.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { OrderDetailsRequestSchema, OrderListRequestSchema, OrderTotalsByCategoryRequestSchema } from "../schemas/orders.schema";

export const ordersRouter = Router();

ordersRouter.get(
  "/",
  validateRequest(OrderListRequestSchema),
  listOrders
);
ordersRouter.get(
  "/totals-by-category",
  validateRequest(OrderTotalsByCategoryRequestSchema),
  getTotalsByCategory
);
ordersRouter.get(
  "/:id",
  validateRequest(OrderDetailsRequestSchema),
  getOrderById
);
ordersRouter.post("/", createOrder);
