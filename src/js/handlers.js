// Функції, які передаються колбеками в addEventListners
import { refs } from './refs.js';
import {
  getProductsByCategory,
  getProducts,
  getProductById,
  getProductsByQuery,
} from './products-api.js';
import {
  renderFunctionProducts,
  appendFunctionProducts,
  removesProductsByCategory,
  renderModalProduct,
} from './render-function.js';
import {
  addProductToCartStorage,
  removeProductFromCartStorage,
  addProductToWishlistStorage,
  removeProductFromWishlistStorage,
  addThemeToStorage,
} from './storage.js';
import { editCartCount } from '../cart.js';
import { showLoader, hideLoader } from './helpers.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let productId;

export async function onCategoryClick(event) {
  if (event.target.tagName !== 'BUTTON') return;
  const btnCategory = event.target;
  const targetCategory = btnCategory.textContent.trim().toLowerCase();
  refs.notFound.classList.remove('not-found--visible');

  // Якщо натиснули "all"
  if (targetCategory === 'all') {
    refs.categoriesList.querySelectorAll('.categories__btn').forEach(btn => {
      if (btn !== btnCategory) btn.classList.remove('categories__btn--active');
    });
    btnCategory.classList.add('categories__btn--active');
    renderFunctionProducts(await getProducts());
    return;
  }

  // Якщо натиснули іншу категорію
  refs.categoriesList.querySelectorAll('.categories__btn').forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === 'all') {
      btn.classList.remove('categories__btn--active');
    }
  });

  btnCategory.classList.toggle('categories__btn--active');

  // Якщо фільтр деактивовано — видаляємо товари цієї категорії
  if (!btnCategory.classList.contains('categories__btn--active')) {
    removesProductsByCategory(targetCategory);
    // Якщо не залишилось жодного продукту — дефолтний рендер
    if (refs.productsList.querySelectorAll('.products__item').length === 0) {
      renderFunctionProducts(await getProducts());
    }
    return;
  }

  // Видаляємо  товари без фільтрації
  refs.productsList.querySelectorAll('.products__item').forEach(item => {
    if (!item.dataset.category) {
      item.remove();
    }
  });

  // Додаємо товари нової категорії
  const productsByCategory = await getProductsByCategory(targetCategory);
  appendFunctionProducts(productsByCategory);
}

export async function onProductClick(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) return;
  productId = productItem.dataset.id;
  const product = await getProductById(productId);
  renderModalProduct(product);
  if (JSON.parse(localStorage.getItem('cart'))?.includes(productId)) {
    refs.modalProductBtnCart.textContent = 'Remove from cart';
    refs.modalProductBtnCart.dataset.inCart = 'true';
  } else {
    refs.modalProductBtnCart.textContent = 'Add to cart';
    refs.modalProductBtnCart.dataset.inCart = 'false';
  }
  if (JSON.parse(localStorage.getItem('wishlist'))?.includes(productId)) {
    refs.modalProductBtnWishlist.textContent = 'Remove from wishlist';
    refs.modalProductBtnWishlist.dataset.inWishlist = 'true';
  } else {
    refs.modalProductBtnWishlist.textContent = 'Add to wishlist';
    refs.modalProductBtnWishlist.dataset.inWishlist = 'false';
  }
}

export function onModalCloseBtnClick() {
  refs.modalProduct.classList.remove('modal--is-open');
}

export function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    event.currentTarget.classList.remove('modal--is-open');
  }
}

export async function onSearchFormSubmit(event) {
  event.preventDefault();
  showLoader();
  const searchQuery = event.target.elements.searchValue.value
    .trim()
    .toLowerCase();
  if (!searchQuery) {
    return;
  }

  const products = await getProductsByQuery(searchQuery);
  refs.productsList.innerHTML = '';
  if (products.length === 0) {
    setTimeout(() => {
      hideLoader();
    }, 200);
    refs.notFound.classList.add('not-found--visible');
    return;
  } else {
    refs.notFound.classList.remove('not-found--visible');
    renderFunctionProducts(products);
  }
}

export async function onBtnClearInputClick(event) {
  event.preventDefault();
  refs.searchForm.elements.searchValue.value = '';
  refs.notFound.classList.remove('not-found--visible');
  renderFunctionProducts(await getProducts());
}

export function onModalProductBtnCartClick(event) {
  event.preventDefault();
  const btn = event.target;

  const isInCart = btn.dataset.inCart === 'true';

  if (!isInCart) {
    addProductToCartStorage(productId);
    iziToast.success({
      title: 'Success',
      message: 'Product added to cart',
      position: 'bottomRight',
    });
    btn.textContent = 'Remove from cart';
    btn.dataset.inCart = 'true';
  } else {
    removeProductFromCartStorage(productId);
    iziToast.success({
      title: 'Success',
      message: 'Product removed from cart',
      position: 'bottomRight',
    });
    btn.textContent = 'Add to cart';
    btn.dataset.inCart = 'false';
  }

  refs.dataCartCount.textContent = JSON.parse(
    localStorage.getItem('cart')
  ).length;
  editCartCount();
}

export function onModalProductBtnWishlistClick(event) {
  event.preventDefault();
  const btn = event.target;

  const isInWishlist = btn.dataset.inWishlist === 'true';

  if (!isInWishlist) {
    addProductToWishlistStorage(productId);
    iziToast.success({
      title: 'Success',
      message: 'Product added to wishlist',
      position: 'bottomRight',
    });
    btn.textContent = 'Remove from wishlist';
    btn.dataset.inWishlist = 'true';
  } else {
    removeProductFromWishlistStorage(productId);
    iziToast.success({
      title: 'Success',
      message: 'Product removed from wishlist',
      position: 'bottomRight',
    });
    btn.textContent = 'Add to wishlist';
    btn.dataset.inWishlist = 'false';
  }

  refs.dataWishlistCount.textContent = JSON.parse(
    localStorage.getItem('wishlist')
  ).length;
}

export function onBtnCartSummaryClick() {
  iziToast.info({
    title: 'Cart Summary',
    message: `You bought ${refs.cartSummaryCount.textContent} items for a total of ${refs.cartSummaryPrice.textContent}.`,
    timeout: 5000,
    position: 'bottomRight',
  });
}

export function onScrollUpBtnClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export function onScrollToMiddleShowScrollUpBtn() {
  if (window.scrollY > window.innerHeight / 2) {
    refs.scrollToTopBtn.classList.add('show-scroll-up-btn');
  } else {
    refs.scrollToTopBtn.classList.remove('show-scroll-up-btn');
  }
}

export function onBtnChangeThemeClick() {
  document.body.classList.toggle('dark-theme');
  addThemeToStorage();
}
