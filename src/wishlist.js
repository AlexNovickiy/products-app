//Логіка сторінки Wishlist
import { refs } from './js/refs';
import { STORAGE_CART_KEY, STORAGE_WISHLIST_KEY } from './js/constants.js';
import { renderFunctionProducts } from './js/render-function';
import { getProductById } from './js/products-api';
import {
  onProductClick,
  onModalCloseBtnClick,
  onBackDropClick,
  onModalProductBtnCartClick,
  onModalProductBtnWishlistClick,
} from './js/handlers';

refs.dataCartCount.textContent =
  JSON.parse(localStorage.getItem(STORAGE_CART_KEY))?.length || 0;
refs.dataWishlistCount.textContent =
  JSON.parse(localStorage.getItem(STORAGE_WISHLIST_KEY))?.length || 0;

refs.productsList.addEventListener('click', onProductClick);
refs.modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
refs.modalProduct.addEventListener('click', onBackDropClick);
refs.modalProductBtnCart.addEventListener('click', onModalProductBtnCartClick);
refs.modalProductBtnWishlist.addEventListener(
  'click',
  onModalProductBtnWishlistClick
);

const wishlist = JSON.parse(localStorage.getItem(STORAGE_WISHLIST_KEY)) || [];
const promisesList = wishlist.map(id => getProductById(id));
Promise.all(promisesList)
  .then(products => {
    renderFunctionProducts(products);
  })
  .catch(() => {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch products for wishlist. Please try again later.',
      position: 'bottomRight',
    });
  });
