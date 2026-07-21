import type { Request, Response, NextFunction } from "express";
import { getUserDetails, getUsersList } from "../services/users.service";
import { ValidatedResponse } from "../schemas/globals";
import { GetUserDetailsRequest, GetUserDetailsResponse, GetUsersRequest, GetUsersResponse } from "../schemas/users.schema";

export function listUsers(_req: Request, res: ValidatedResponse<GetUsersRequest, GetUsersResponse>, next: NextFunction) {
  try {
    const users = getUsersList();

    return res.status(200).json({ users });

  } catch (err) {
    next(err);
  }
}

export async function getUserById(_req: Request, res: ValidatedResponse<GetUserDetailsRequest, GetUserDetailsResponse>, next: NextFunction) {
  try {
    const user = getUserDetails(res.locals.validated.params.id);

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function createUser(_req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: exercise 12
    return res.status(501).json({ message: "Not implemented" });
  } catch (err) {
    next(err);
  }
}
