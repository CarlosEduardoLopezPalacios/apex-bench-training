import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getTotalsByCategory,
  listOrders,
} from "../controllers/orders.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { OrderDetailsRequestSchema, OrderListRequestSchema } from "../schemas/orders.schema";

export const ordersRouter = Router();

ordersRouter.get(
  "/",
  validateRequest(OrderListRequestSchema),
  listOrders
);
ordersRouter.get(
  "/:id",
  validateRequest(OrderDetailsRequestSchema),
  getOrderById
);
ordersRouter.post("/", createOrder);
ordersRouter.post("/totals-by-category", getTotalsByCategory);
