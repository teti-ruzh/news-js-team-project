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


let categories = [];

const newApiCategory = new ApiCategory();

async function getCategories() {
  categories = await newApiCategory.fetchApiCategory();
  console.log(categories);
}

getCategories();

// document.addEventListener('DOMContentLoaded', async () => {
//   await getCategories();
//   changeWindow();
// });

window.addEventListener(
  'resize',
  throttle(() => changeWindow(), 250)
);

window.addEventListener('load', () => {
  changeWindow();
});

function changeWindow() {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    renderCategoriesDesktop(categories);
    refs.categoryTabletBtn.addEventListener('click', () =>
      categoriesDesktopRendering(categories)
    );
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    renderCategoriesTablet(categories);
    refs.categoryTabletBtn.addEventListener('click', () =>
      categoriesTabletRendering(categories)
    );
  } else {
    refs.categoryMobileBtn.addEventListener('click', () =>
      categoriesMobileRendering(categories)
    );
  }
}

function renderCategoriesMobile(categories) {
  let categoriesRender = '';
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    categoriesRender += `<li class="category__item" id="category-overlay">
            ${category.display_name}
      </li>`;
  }
  refs.categoryMobileOverlay.innerHTML = categoriesRender;
}

function categoriesMobileRendering(categories) {
  if (refs.categoryMobileOverlay.classList.contains('category__mob-open')) {
    refs.categoryMobileOverlay.classList.remove('category__mob-open');
  } else {
    renderCategoriesMobile(categories);
    refs.categoryMobileOverlay.classList.add('category__mob-open');
  }
}


function renderCategoriesTablet(categories) {
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


function renderCategoriesDesktop(categories) {
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
