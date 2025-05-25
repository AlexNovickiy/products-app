// Функції для роботи з бекендом
import axios from 'axios';
import { refs } from './refs.js';

const API_BASE_URL = 'https://dummyjson.com/products';
const API_CATEGORIES_URL = 'category-list';
const currentPage = 1;
const url = `https://dummyjson.com/products?limit=12&skip=${
  (currentPage - 1) * 12
}`;
const limit = 12;

export async function getProductsCategories() {
  try {
    const response = await axios.get(`${API_BASE_URL}/${API_CATEGORIES_URL}`);
    const categories = ['All', ...response.data];
    return categories;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function getProducts() {
  try {
    const response = await axios.get(`${url}`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function getProductsByCategory(category) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/category/${category}?limit=${limit}&skip=${
        (currentPage - 1) * limit
      }`
    );
    if (response.data.products.length === 0) {
      refs.notFound.classList.add('not-found--visible');
    } else {
      refs.notFound.classList.remove('not-found--visible');
    }
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
  }
}
