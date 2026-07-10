// TODO: add Zod schemas during exercises.

import z from "zod/v4";
import { Product } from "../types";
import { CategoriesEnum } from "./globals";

export const GetProductsParamsSchema = z.object({
    query: z.object({
        minPrice: z.coerce.number().min(0).optional(),
        maxPrice: z.coerce.number().min(1).optional(),
        category: CategoriesEnum.optional()
    }).refine(
        (query) =>
            query.minPrice === undefined ||
            query.maxPrice === undefined ||
            query.maxPrice >= query.minPrice,
            {
                message: "maxPrice must be greater than or equal to minPrice",
                path: ["query", "maxPrice"],
            }
        ),
    body: z.object().optional(),
    params: z.object().optional(),
});

export type GetProductsParams = z.infer<typeof GetProductsParamsSchema>;

export interface GetProductsResponse {
    products: Product[];
}

export const GetProductByIdSchema = z.object({
    query: z.object().optional(),
    body: z.object().optional(),
    params: z.object({
        id: z.coerce.number().int().positive(),
    })
});

export type GetProductById = z.infer<typeof GetProductByIdSchema>;

export interface GetProductByIdResponse {
    product: Product,
}

export const CreateProductSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        category: CategoriesEnum,
        price: z.coerce.number().positive(),
        stock: z.coerce.number().int().min(0),
    }),
    params: z.object().optional(),
    query: z.object().optional(),
});

export type CreateProduct = z.infer<typeof CreateProductSchema>;

export const UpdateProductPriceSchema = z.object({
    body: z.object({
        price: z.coerce.number().positive().min(1),
    }),
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
    query: z.object().optional(),
});

export type UpdateProductPrice = z.infer<typeof UpdateProductPriceSchema>;

export const DeleteProductSchema = z.object({
    query: z.object().optional(),
    body: z.object().optional(),
    params: z.object({
        id: z.coerce.number().int().positive(),
    })
});

export type DeleteProduct = z.infer<typeof DeleteProductSchema>;
