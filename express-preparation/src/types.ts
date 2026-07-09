export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
};

export type OrderItem = {
  productId: number;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  createdAt: string;
};
