import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getTotalsByCategory,
  listOrders,
} from "../controllers/orders.controller";

export const ordersRouter = Router();

ordersRouter.get("/", listOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.post("/", createOrder);
ordersRouter.post("/totals-by-category", getTotalsByCategory);
