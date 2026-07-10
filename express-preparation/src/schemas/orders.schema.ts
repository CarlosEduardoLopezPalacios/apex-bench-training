import { z } from "zod/v4";
import { Order } from "../types";

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
