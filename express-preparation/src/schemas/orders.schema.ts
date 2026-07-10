import { z } from "zod/v4";
import { Order } from "../types";
import { CategoriesEnum } from "./globals";

export const OrderListRequestSchema = z.object({
    query: z.object().optional(),
    body: z.object().optional(),
    params: z.object().optional(),
});

export type OrderListRequest = z.infer<typeof OrderListRequestSchema>;

export interface OrderListResponse {
    orders: Order[];
}

export const OrderDetailsRequestSchema = z.object({
    query: z.object().optional(),
    body: z.object().optional(),
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
});

export type OrderDetailsRequest = z.infer<typeof OrderDetailsRequestSchema>

export interface OrderDetailsResponse {
    order: Order;
}

export const OrderTotalsByCategoryRequestSchema = z.object({
    query: z.object().optional(),
    body: z.object().optional(),
    params: z.object().optional(),
});

export type OrderTotalsByCategoryRequest = z.infer<typeof OrderTotalsByCategoryRequestSchema>;

export const OrderTotalsByCategoryResponseSchema = z.array(
  z.object({
    category: CategoriesEnum,
    orders: z.number(),
    items: z.number(),
    total: z.number(),
  })
);

export type OrderTotalsByCategoryResponse = z.infer<typeof OrderTotalsByCategoryResponseSchema>

export const CreateOrderRequestSchema = z.object({
    query: z.object().optional(),
    body: z.object({
        userId: z.coerce.number().int().positive(),
        items: z.array(z.object({
            productId: z.coerce.number().int().positive(),
            quantity: z.coerce.number().int().positive().min(1),
        })).min(1),
        total: z.coerce.number().int().positive(),
    }),
    params: z.object().optional(),
});

export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;

export type CreateOrderResponse = Order;
