import z from "zod/v4";
import { User } from "../types";

export const GetUsersRequestSchema = z.object({
    query: z.object().optional(),
    body: z.object().optional(),
    params: z.object().optional(),
});

export type GetUsersRequest = z.infer<typeof GetUsersRequestSchema>;

export interface GetUsersResponse {
    users: User[];
}

export const GetUserDetailsRequestSchema = z.object({
    query: z.object().optional(),
    body: z.object().optional(),
    params: z.object({
        id: z.coerce.number().int().positive(),
    })
});

export type GetUserDetailsRequest = z.infer<typeof GetUserDetailsRequestSchema>;

export interface GetUserDetailsResponse {
    user: User,
}
