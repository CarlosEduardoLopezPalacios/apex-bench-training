import { findAllOrders, findOrderById } from "../repositories/orders.repository";
import { Order } from "../types";
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
}

export {
    getOrdersList,
    getOrderDetailsById,
}
