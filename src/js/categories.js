import throttle from 'lodash.throttle';

import { ApiCategory } from './news-fetch-service';
import { fetchArticleSearch } from './news-gallery';

const refs = {
  categoryMobileOverlay: document.querySelector('.category__mobile-overlay'),
  categoryMobileBtn: document.querySelector('.category__mobile-btn'),
  categoryList: document.querySelector('.category__list-rendering'),
  categoryTabletBtn: document.querySelector('.category__tablet-btn'),
  categoryTabletOverlay: document.querySelector(
    '.category__tablet-btn-container .category__tablet-overlay'
  ),
  categoryDesktopBtn: document.querySelector('#category-desktop-btn'),
  categoryQuery: document.querySelectorAll('#category-overlay'),
};
const newApiCategory = new ApiCategory();

window.addEventListener(
  'resize',
  throttle(() => changeWindow(), 250)
);

window.addEventListener('load', () => {
  changeWindow();
});

function changeWindow() {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    renderCategoriesDesktop();
    refs.categoryTabletBtn.addEventListener(
      'click',
      categoriesDesktopRendering
    );
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    renderCategoriesTablet();
    refs.categoryTabletBtn.addEventListener('click', categoriesTabletRendering);
  } else {
    refs.categoryMobileBtn.addEventListener('click', categoriesMobileRendering);
  }
}

async function renderCategoriesMobile() {
  const categories = await newApiCategory.fetchApiCategory();

  let categoriesRender = '';
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    categoriesRender += `<li class="category__item" id="category-overlay">
            ${category.display_name}
      </li>`;
  }
  refs.categoryMobileOverlay.innerHTML = categoriesRender;
}

function categoriesMobileRendering() {
  if (refs.categoryMobileOverlay.classList.contains('category__mob-open')) {
    refs.categoryMobileOverlay.classList.remove('category__mob-open');
  } else {
    renderCategoriesMobile();
    refs.categoryMobileOverlay.classList.add('category__mob-open');
  }
}

async function renderCategoriesTablet() {
  const categories = await newApiCategory.fetchApiCategory();

  renderTabletButtons(categories);
  renderTabletOverlay(categories);
}

function renderTabletButtons(categories) {
  const sortSections = categories.slice(0, 4);

  let btnRender = '';
  for (let i = 0; i < sortSections.length; i++) {
    const section = sortSections[i];
    btnRender += `<li class="category__item" id="category-overlay">
      <button class="category__btn" type="button">
          ${section.display_name}
      </button>
    </li>`;
  }
  refs.categoryList.innerHTML = btnRender;
}

function renderTabletOverlay(categories) {
  const sortSections = categories.slice(4, categories.length);

  let categoriesRender = '';
  for (let i = 0; i < sortSections.length; i++) {
    const category = sortSections[i];
    categoriesRender += `<li class="category__item" id="category-overlay">
            ${category.display_name}
      </li>`;
  }
  refs.categoryTabletOverlay.innerHTML = categoriesRender;
}

function categoriesTabletRendering() {
  if (refs.categoryTabletOverlay.classList.contains('category__tablet-open')) {
    refs.categoryTabletOverlay.classList.remove('category__tablet-open');
  } else {
    refs.categoryTabletOverlay.classList.add('category__tablet-open');
  }
}

async function renderCategoriesDesktop() {
  const categories = await newApiCategory.fetchApiCategory();

  renderDesktopButtons(categories);
  renderDesktopOverlay(categories);
}

function renderDesktopButtons(categories) {
  const sortSections = categories.slice(0, 6);

  let btnRender = '';
  for (let i = 0; i < sortSections.length; i++) {
    const section = sortSections[i];
    btnRender += `<li class="category__tablet-item" id="category-overlay">
      <button class="category__btn"  type="button">
          ${section.display_name}
      </button>
    </li>`;
  }
  refs.categoryList.innerHTML = btnRender;
}

function renderDesktopOverlay(categories) {
  const sortSections = categories.slice(6, categories.length);

  let categoriesRender = '';
  for (let i = 0; i < sortSections.length; i++) {
    const category = sortSections[i];
    categoriesRender += `<li class="category__item" id="category-overlay">
            ${category.display_name}
      </li>`;
  }
  refs.categoryTabletOverlay.innerHTML = categoriesRender;
}

function categoriesDesktopRendering() {
  if (refs.categoryTabletOverlay.classList.contains('category__tablet-open')) {
    refs.categoryTabletOverlay.classList.remove('category__tablet-open');
  } else {
    refs.categoryTabletOverlay.classList.add('category__tablet-open');
  }
}
