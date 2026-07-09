import type { Request, NextFunction } from "express";
import {
  getProducts,
  getProductById as getProductByIdService,
  createProduct as createProductService,
  updateProductPrice as updateProductPriceService,
  deleteProduct as deleteProductService
} from "../services/products.service";
import { CreateProduct, DeleteProduct, GetProductById, GetProductsParams, GetProductsResponse, UpdateProductPrice } from "../schemas/products.schema";
import { ValidatedResponse } from "../schemas/globals";
import { Product } from "../types";

export function listProducts(_req: Request, res: ValidatedResponse<GetProductsParams, GetProductsResponse>, next: NextFunction) {
  try {
    const { query } = res.locals.validated;
    const products = getProducts(query);
    return res.status(200).json({
      products,
    });
  } catch (err) {
    next(err);
  }
}

export function getProductById(_req: Request, res: ValidatedResponse<GetProductById, { product: Product }>, next: NextFunction) {
  try {
    const { params } = res.locals.validated;
    const product = getProductByIdService(params);
    return res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
}

export function createProduct(_req: Request, res: ValidatedResponse<CreateProduct, { product: Product }>, next: NextFunction) {
  try {
    const { body } = res.locals.validated;
    const createdProduct = createProductService(body);
    return res.status(201).json({ product: createdProduct });
  } catch (err) {
    next(err);
  }
}

export function updateProductPrice(_req: Request, res: ValidatedResponse<UpdateProductPrice, { product: Product }>, next: NextFunction) {
  try {
    const { body, params } = res.locals.validated;
    const updatedProduct = updateProductPriceService({ body, params });
    return res.status(200).json({ product: updatedProduct });
  } catch (err) {
    next(err);
  }
}

export function deleteProduct(_req: Request, res: ValidatedResponse<DeleteProduct>, next: NextFunction) {
  try {
    const { params: { id } } = res.locals.validated;
    deleteProductService(id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
