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
} from './storage.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let productId;

export async function onCategoryClick(event) {
  if (event.target.tagName !== 'BUTTON') return;
  const btnCategory = event.target;
  const targetCategory = btnCategory.textContent.trim().toLowerCase();

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
  const searchQuery = event.target.elements.searchValue.value
    .trim()
    .toLowerCase();
  if (!searchQuery) {
    refs.notFound.classList.add('not-found--visible');
    return;
  }

  const products = await getProductsByQuery(searchQuery);
  refs.productsList.innerHTML = '';
  if (products.length === 0) {
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
      position: 'topRight',
    });
    btn.textContent = 'Remove from cart';
    btn.dataset.inCart = 'true';
  } else {
    removeProductFromCartStorage(productId);
    iziToast.success({
      title: 'Success',
      message: 'Product removed from cart',
      position: 'topRight',
    });
    btn.textContent = 'Add to cart';
    btn.dataset.inCart = 'false';
  }

  refs.dataCartCount.textContent = JSON.parse(
    localStorage.getItem('cart')
  ).length;
}
