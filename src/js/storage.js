//Робота з loacalStorage
import { STORAGE_CART_KEY } from './constants.js';

export function addProductToCartStorage(productId) {
  const productListId =
    JSON.parse(localStorage.getItem(STORAGE_CART_KEY)) || [];
  productListId.push(productId);
  localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(productListId));
}

export function removeProductFromCartStorage(productId) {
  const productListId =
    JSON.parse(localStorage.getItem(STORAGE_CART_KEY)) || [];
  const updatedProductListId = productListId.filter(id => id !== productId);
  localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(updatedProductListId));
}
