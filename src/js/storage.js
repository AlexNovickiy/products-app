//Робота з loacalStorage
import {
  STORAGE_CART_KEY,
  STORAGE_WISHLIST_KEY,
  STORAGE_THEME_KEY,
} from './constants.js';
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

export function addProductToWishlistStorage(productId) {
  const productListId =
    JSON.parse(localStorage.getItem(STORAGE_WISHLIST_KEY)) || [];
  productListId.push(productId);
  localStorage.setItem(STORAGE_WISHLIST_KEY, JSON.stringify(productListId));
}

export function removeProductFromWishlistStorage(productId) {
  const productListId =
    JSON.parse(localStorage.getItem(STORAGE_WISHLIST_KEY)) || [];
  const updatedProductListId = productListId.filter(id => id !== productId);
  localStorage.setItem(
    STORAGE_WISHLIST_KEY,
    JSON.stringify(updatedProductListId)
  );
}

export function addThemeToStorage() {
  if (localStorage.getItem(STORAGE_THEME_KEY) !== 'dark') {
    localStorage.setItem(STORAGE_THEME_KEY, 'dark');
  }
}
