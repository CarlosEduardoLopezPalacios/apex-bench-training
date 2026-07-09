import { db } from "../data/db";
import type { Order } from "../types";

export function findAllOrders() {
  return db.orders;
}

export function findOrderById(id: number) {
  return db.orders.find((order) => order.id === id);
}

export function insertOrder(order: Order) {
  db.orders.push(order);
  return order;
}
