//Логіка сторінки Cart
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
  onBtnCartSummaryClick,
  onScrollUpBtnClick,
  onScrollToMiddleShowScrollUpBtn,
} from './js/handlers';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
if (refs.cartSummaryBtn) {
  refs.cartSummaryBtn.addEventListener('click', onBtnCartSummaryClick);
}

editCartCount();

export function editCartCount() {
  const cart = JSON.parse(localStorage.getItem(STORAGE_CART_KEY)) || [];
  if (refs.cartSummaryCount && refs.cartSummaryPrice) {
    refs.cartSummaryCount.textContent = cart.length;
    const promisesList = cart.map(id => getProductById(id));

    Promise.all(promisesList).then(products => {
      const totalPrice = products.reduce((total, product) => {
        const productPrice = parseFloat(product.price);
        total += productPrice;
        return total;
      }, 0);

      refs.cartSummaryPrice.textContent = `$${totalPrice.toFixed(2)}`;
      renderFunctionProducts(products);
    });
  }
}

refs.scrollToTopBtn.addEventListener('click', onScrollUpBtnClick);

document.addEventListener('scroll', onScrollToMiddleShowScrollUpBtn);
