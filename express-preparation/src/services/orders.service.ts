import { findAllOrders, findLastId, findOrderById, findTotalOrdersByCategory, insertOrder } from "../repositories/orders.repository";
import { findProductById, decreaseProductStock } from "../repositories/products.repository";
import { findUserById } from "../repositories/users.repository";
import { CreateOrderRequest } from "../schemas/orders.schema";
import { Categories } from "../schemas/globals";
import { Order, OrderItem } from "../types";
import { HttpError } from "../utils/http-error";

const getOrdersList = (): Order[] => {
    return findAllOrders();
};

const getOrderDetailsById = (id: Order['id']): Order => {
    const order = findOrderById(id);
    if (!order) {
        throw new HttpError(404, 'Order not found');
    }
    return order;
};

const getTotalOrdersByCategory = () => {
    return findTotalOrdersByCategory();
};

const createOrder = (order: CreateOrderRequest['body']): Order => {
  if (!findUserById(order.userId)) {
    throw new HttpError(404, "User not found");
  }

  const quantitiesByProduct = order.items.reduce((items, item) => {
    items.set(item.productId, (items.get(item.productId) ?? 0) + item.quantity);
    return items;
  }, new Map<number, number>());

  const validatedItems: OrderItem[] = Array.from(quantitiesByProduct).map(([productId, quantity]) => {
    const product = findProductById(productId);

    if (!product) {
      throw new HttpError(404, `Product ${productId} not found`);
    }

    if (product.stock < quantity) {
      throw new HttpError(409, `Insufficient stock for product ${productId}`);
    }

    return {
      productId: product.id,
      quantity,
      unitPrice: product.price,
      category: product.category as Categories,
    };
  });

  const calculatedTotal = validatedItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  if (order.total !== calculatedTotal) {
    throw new HttpError(400, "Order total does not match product prices");
  }

  validatedItems.forEach((item) => {
    decreaseProductStock(item.productId, item.quantity);
  });

  return insertOrder({
    userId: order.userId,
    items: validatedItems,
    total: calculatedTotal,
    createdAt: new Date().toISOString(),
  });
};

export {
    getOrdersList,
    getOrderDetailsById,
    getTotalOrdersByCategory,
    createOrder,
};
