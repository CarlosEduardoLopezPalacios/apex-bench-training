import { findAllProducts, findLastId, findProductById, findProductByName, insertProduct, removeProductById, replaceProductPrice } from "../repositories/products.repository";
import { CreateProduct, GetProductById, GetProductsParams, UpdateProductPrice } from "../schemas/products.schema";
import { Product } from "../types";
import { HttpError } from "../utils/http-error";

const getProducts = (params: GetProductsParams['query']): Product[] => {
    const products = findAllProducts();
    const { minPrice = 0, maxPrice = Infinity, category = '' } = params;
    const filteredProducts = products.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice && product.category.includes(category);
    });
    return filteredProducts;
};

const getProductById = (params: GetProductById['params']): Product => {
    const product = findProductById(params.id);
    if (!product) {
        throw new HttpError(404, "Product not found");
    }
    return product;
};

const createProduct = (params: CreateProduct['body']): Product => {
    const isDuplicate = !!findProductByName(params.name);

    const lastId = findLastId();
    if (isDuplicate) {
        throw new HttpError(409, "Product duplicate");
    }
    return insertProduct({
        ...params,
        id: lastId + 1,
    });
};

const updateProductPrice = ({ body, params }: UpdateProductPrice): Product => {
    const updatedProduct = replaceProductPrice({ price: body.price, id: params.id });
    if (!updatedProduct) {
        throw new HttpError(404, "Product not found");
    }
    return updatedProduct;
};

const deleteProduct = (id: number): void => {
  const wasRemoved = removeProductById(id);

  if (!wasRemoved) {
    throw new HttpError(404, "Product not found");
  }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProductPrice,
    deleteProduct,
};
