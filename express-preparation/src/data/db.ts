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

  orders: [
    {
    id: 1,
    userId: 1,
    items: [
      {
        productId: 1,
        quantity: 2,
        unitPrice: 20,
        category: "Books",
      },
      {
        productId: 4,
        quantity: 1,
        unitPrice: 150,
        category: "Electronics",
      },
    ],
    total: 190,
    createdAt: "2026-07-11T10:00:00.000Z",
  },

  {
    id: 2,
    userId: 2,
    items: [
      {
        productId: 2,
        quantity: 3,
        unitPrice: 15,
        category: "Books",
      },
    ],
    total: 45,
    createdAt: "2026-07-11T11:15:00.000Z",
  },

  {
    id: 3,
    userId: 1,
    items: [
      {
        productId: 3,
        quantity: 1,
        unitPrice: 80,
        category: "Home",
      },
      {
        productId: 5,
        quantity: 2,
        unitPrice: 60,
        category: "Home",
      },
    ],
    total: 200,
    createdAt: "2026-07-11T13:30:00.000Z",
  },

  {
    id: 4,
    userId: 3,
    items: [
      {
        productId: 6,
        quantity: 1,
        unitPrice: 250,
        category: "Electronics",
      },
      {
        productId: 2,
        quantity: 2,
        unitPrice: 15,
        category: "Books",
      },
    ],
    total: 280,
    createdAt: "2026-07-12T09:20:00.000Z",
  },

  {
    id: 5,
    userId: 2,
    items: [
      {
        productId: 7,
        quantity: 4,
        unitPrice: 35,
        category: "Home",
      },
    ],
    total: 140,
    createdAt: "2026-07-12T16:45:00.000Z",
  },
  ] as Order[],
};
