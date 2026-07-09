import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProductPrice,
} from "../controllers/products.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { CreateProductSchema, DeleteProductSchema, GetProductByIdSchema, GetProductsParamsSchema, UpdateProductPriceSchema } from "../schemas/products.schema";

export const productsRouter = Router();

productsRouter.get(
  "/",
  validateRequest(GetProductsParamsSchema),
  listProducts
);
productsRouter.get(
  "/:id",
  validateRequest(GetProductByIdSchema),
  getProductById
);
productsRouter.post(
  "/",
  validateRequest(CreateProductSchema),
  createProduct
);
productsRouter.patch(
  "/:id/price",
  validateRequest(UpdateProductPriceSchema),
  updateProductPrice
);
productsRouter.delete(
  "/:id",
  validateRequest(DeleteProductSchema),
  deleteProduct
);
