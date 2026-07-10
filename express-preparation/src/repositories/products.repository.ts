import { db } from "../data/db";
import type { OrderItem, Product } from "../types";

export function findAllProducts() {
  return db.products;
}

export function findProductById(id: number) {
  return db.products.find((product) => product.id === id);
}

export function findProductByName(name: string) {
  return db.products.find((product) => product.name.toLowerCase() === name.toLowerCase());
}

export function insertProduct(product: Product) {
  db.products.push(product);
  return product;
}

export function findLastId(): number {
  return db.products.reduce((acc, product) => {
    if (acc > product.id) {
      return acc;
    }
    acc = product.id;
    return acc;
  }, 0)
}

export function replaceProductPrice({ price, id } : { price: number; id: number; }) {
   const index = db.products.findIndex((item) => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedProduct = {
    ...db.products[index],
    price,
  };

  db.products[index] = updatedProduct;
  return updatedProduct;
}

export function replaceProduct(product: Product) {
  const index = db.products.findIndex((item) => item.id === product.id);

  if (index === -1) {
    return undefined;
  }

  db.products[index] = product;
  return product;
}

export function removeProductById(id: number) {
  const index = db.products.findIndex((product) => product.id === id);

  if (index === -1) {
    return false;
  }

  db.products.splice(index, 1);
  return true;
}

export function decreaseProductStock(id: Product['id'], quantity: number) {
  const index = db.products.findIndex((p) => p.id === id);

  if (index === -1 || db.products[index].stock < quantity) {
    return undefined;
  }

  db.products[index].stock -= quantity;
  return db.products[index];
}
