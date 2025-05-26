import { refs } from './js/refs';
import {
  renderFunctionCategories,
  renderFunctionProducts,
} from './js/render-function';
import { getProductsCategories, getProducts } from './js/products-api';
import {
  onCategoryClick,
  onSearchFormSubmit,
  onBtnClearInputClick,
} from './js/handlers';
import { STORAGE_CART_KEY } from './js/constants.js';

//Логіка сторінки Home

renderCategoriesList();
renderProductsList();
refs.dataCartCount.textContent =
  JSON.parse(localStorage.getItem(STORAGE_CART_KEY))?.length || 0;

async function renderCategoriesList() {
  const categoriesList = await getProductsCategories();
  renderFunctionCategories(categoriesList);
}

async function renderProductsList() {
  const productsList = await getProducts();
  renderFunctionProducts(productsList);
}

refs.categoriesList.addEventListener('click', onCategoryClick);

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.searchForm
  .querySelector('.search-form__btn-clear')
  .addEventListener('click', onBtnClearInputClick);
