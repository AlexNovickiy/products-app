import { refs } from './js/refs';
import {
  renderFunctionCategories,
  renderFunctionProducts,
} from './js/render-function';
import { getProductsCategories, getProducts } from './js/products-api';
import { onCategoryClick } from './js/handlers';

//Логіка сторінки Home

renderCategoriesList();
renderProductsList();

async function renderCategoriesList() {
  const categoriesList = await getProductsCategories();
  renderFunctionCategories(categoriesList);
}

async function renderProductsList() {
  const productsList = await getProducts();
  renderFunctionProducts(productsList);
}

refs.categoriesList.addEventListener('click', onCategoryClick);
