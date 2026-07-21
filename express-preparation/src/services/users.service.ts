import { findAllUsers, findUserById } from "../repositories/users.repository";
import { User } from "../types";
import { HttpError } from "../utils/http-error";

const getUsersList = () => {
    return findAllUsers();
};

const getUserDetails = (id: User['id']) => {
    const user = findUserById(id);
    if (!user) {
        throw new HttpError(404, "User not found");
    }
    return user;
};

export {
    getUsersList,
    getUserDetails,
};
