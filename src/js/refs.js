//Обʼєкт з посиланнями на ДОМ елементи

export const refs = {
  categoriesList: document.querySelector('.categories'),
  productsList: document.querySelector('.products'),
  notFound: document.querySelector('.not-found'),
  modalProduct: document.querySelector('.modal'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  searchForm: document.querySelector('.search-form'),
  modalProductBtnCart: document.querySelector('.modal-product__btn--cart'),
  dataCartCount: document.querySelector('.nav__count[data-cart-count]'),
  modalProductBtnWishlist: document.querySelector(
    '.modal-product__btn--wishlist'
  ),
  dataWishlistCount: document.querySelector('.nav__count[data-wishlist-count]'),
  cartSummaryPrice: document.querySelector('.cart-summary__value[data-price]'),
  cartSummaryCount: document.querySelector('.cart-summary__value[data-count]'),
  cartSummaryBtn: document.querySelector('.cart-summary__btn'),
  loader: document.querySelector('.loader-wrapper'),
};
