import { Router } from "express";
import { createUser, getUserById, listUsers } from "../controllers/users.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { GetUserDetailsRequestSchema, GetUsersRequestSchema } from "../schemas/users.schema";

export const usersRouter = Router();

usersRouter.get(
    "/",
    validateRequest(GetUsersRequestSchema),
    listUsers,
);
usersRouter.get(
    "/:id",
    validateRequest(GetUserDetailsRequestSchema),
    getUserById,
);
usersRouter.post("/", createUser);
