// Функції, які передаються колбеками в addEventListners
import { refs } from './refs.js';
import { getProductsByCategory, getProducts } from './products-api.js';
import {
  renderFunctionProducts,
  appendFunctionProducts,
  removesProductsByCategory,
} from './render-function.js';

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
