import { Router } from "express";
import { productsRouter } from "./products.routes";
import { ordersRouter } from "./orders.routes";
import { usersRouter } from "./users.routes";

export const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/users", usersRouter);
