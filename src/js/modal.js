//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { refs } from './refs.js';
import {
  onProductClick,
  onModalCloseBtnClick,
  onBackDropClick,
  onModalProductBtnCartClick,
  onModalProductBtnWishlistClick,
} from './handlers.js';

refs.productsList.addEventListener('click', onProductClick);
refs.modalCloseBtn.addEventListener('click', onModalCloseBtnClick);
refs.modalProduct.addEventListener('click', onBackDropClick);
refs.modalProductBtnCart.addEventListener('click', onModalProductBtnCartClick);
refs.modalProductBtnWishlist.addEventListener(
  'click',
  onModalProductBtnWishlistClick
);
