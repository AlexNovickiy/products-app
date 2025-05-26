// Функції для роботи з бекендом
import axios from 'axios';
import { refs } from './refs.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch categories. Please try again later.',
      position: 'topRight',
    });
  }
}

export async function getProducts() {
  try {
    const response = await axios.get(`${url}`);
    return response.data.products;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch categories. Please try again later.',
      position: 'topRight',
    });
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
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch products by category. Please try again later.',
      position: 'topRight',
    });
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch product by ID. Please try again later.',
      position: 'topRight',
    });
  }
}

export async function getProductsByQuery(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        q: query,
        limit: limit,
        skip: (currentPage - 1) * limit,
      },
    });
    return response.data.products;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch products by query. Please try again later.',
      position: 'topRight',
    });
  }
}
