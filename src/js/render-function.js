//Функції  для створення, рендеру або видалення розмітки
import { refs } from './refs.js';
import { showLoader, hideLoader } from './helpers.js';

export function renderFunctionCategories(categoriesList) {
  refs.categoriesList.innerHTML = categoriesList
    .map(category => {
      return `<li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>`;
    })
    .join('');
}

export function renderFunctionProducts(productsList) {
  showLoader();
  refs.productsList.innerHTML = productsList
    .map(product => {
      return `<li class="products__item" data-id="${product.id}">
    <img class="products__image" src="${product.images[0]}" alt="${product.title}"/>
    <p class="products__title">${product.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
    <p class="products__category">Category: ${product.category}</p>
    <p class="products__price">Price: $${product.price}</p>
 </li>
`;
    })
    .join('');
  setTimeout(() => {
    hideLoader();
  }, 200);
}

export function appendFunctionProducts(productsList) {
  showLoader();
  refs.productsList.insertAdjacentHTML(
    'beforeend',
    productsList
      .map(product => {
        return `<li class="products__item" data-id="${product.id}" data-category="${product.category}">
    <img class="products__image" src="${product.images[0]}" alt="${product.title}"/>
    <p class="products__title">${product.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
    <p class="products__category">Category: ${product.category}</p>
    <p class="products__price">Price: $${product.price}</p>
 </li>
`;
      })
      .join('')
  );
  setTimeout(() => {
    hideLoader();
  }, 200);
}

export function removesProductsByCategory(category) {
  const products = Array.from(refs.productsList.children);
  products.forEach(product => {
    const productCategory = product.dataset.category.trim().toLowerCase();
    if (productCategory === category) {
      product.remove();
    }
  });
}

export function renderModalProduct(product) {
  refs.modalProduct.classList.add('modal--is-open');
  const productContainer = refs.modalProduct.querySelector('.modal-product');
  productContainer.innerHTML = `
    <img class="modal-product__img" src="${product.images[0]}" alt="${
    product.title
  }" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title}</p>
        <ul class="modal-product__tags">
          ${product.tags
            .map(tag => `<li class="modal-product__tag">${tag}</li>`)
            .join('')}
        </ul>
        <p class="modal-product__description">${product.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${
          product.shipping
        }</p>
        <p class="modal-product__return-policy">Return Policy: ${
          product.returnPolicy
        }</p>
        <p class="modal-product__price">Price: $${product.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `;
}
