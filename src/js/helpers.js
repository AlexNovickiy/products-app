//Допоміжні функції
import { refs } from './refs.js';

export function showLoader() {
  refs.loader.classList.add('loader');
}

export function hideLoader() {
  refs.loader.classList.remove('loader');
}
