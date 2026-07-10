import { db } from "../data/db";
import type { Order } from "../types";

export function findAllOrders() {
  return db.orders;
}

export function findOrderById(id: number) {
  return db.orders.find((order) => order.id === id);
}

export function findTotalOrdersByCategory() {
  const objectResult = db.orders.reduce((acc, order) => {
    let currentCategory = '';
    order.items.forEach((item) => {
      currentCategory = item.category;
      if (!acc[item.category]) {
        acc[item.category] = {
          orders: 0,
          items: item.quantity,
          total: item.unitPrice * item.quantity,
        }
      } else {
        acc[item.category] = {
          ...acc[item.category], 
          items: acc[item.category].items + item.quantity,
          total: acc[item.category].total + (item.quantity * item.unitPrice),
        }
      }
      acc[item.category].orders += 1;
    })
    return acc;
  }, {} as { [key: string]: { orders: number; items: number; total: number; } }); 
  return Object.keys(objectResult).map((key) => {
    return {
      category: key,
      ...objectResult[key]
    }
  })
}

export function findLastId(): number {
  return db.orders.reduce((acc, order) => {
    if (acc > order.id) {
      return acc;
    }
    acc = order.id;
    return acc;
  }, 0)
}


export function insertOrder(order: Omit<Order, 'id'>) {
  const newOrder = { ...order, id: findLastId() + 1 };
  db.orders.push(newOrder);
  return newOrder;
}
