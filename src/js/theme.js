import { refs } from './refs';
import { onBtnChangeThemeClick } from './handlers';
import { STORAGE_THEME_KEY } from './constants.js';

refs.btnChangeTheme.addEventListener('click', onBtnChangeThemeClick);

function setTheme() {
  const theme = localStorage.getItem(STORAGE_THEME_KEY) || '';
  document.body.classList.toggle('dark-theme', theme === 'dark');
}

setTheme();
