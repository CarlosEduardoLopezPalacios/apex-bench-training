import type { Order, Product, User } from "../types";

export const db = {
  products: [
    { id: 1, name: "Mechanical Keyboard", category: "Electronics", price: 120, stock: 10 },
    { id: 2, name: "Coffee Mug", category: "Home", price: 15, stock: 25 },
    { id: 3, name: "Node.js Book", category: "Books", price: 40, stock: 5 },
  ] satisfies Product[],

  users: [
    { id: 1, name: "Carlos", email: "carlos@example.com", passwordHash: "hashed_password" },
  ] satisfies User[],

  orders: [] satisfies Order[],
};
