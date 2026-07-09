import { db } from "../data/db";
import type { User } from "../types";

export function findAllUsers() {
  return db.users;
}

export function findUserById(id: number) {
  return db.users.find((user) => user.id === id);
}

export function findUserByEmail(email: string) {
  return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function insertUser(user: User) {
  db.users.push(user);
  return user;
}
