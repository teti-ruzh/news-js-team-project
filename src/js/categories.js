import throttle from 'lodash.throttle';

import { fetchApiCategory } from './news-fetch-service';
import { fetchArticleSearch } from './news-gallery';

const refs = {
  categoryMobileOverlay: document.querySelector('.category__mobile-overlay'),
  categoryMobileBtn: document.querySelector('.category__mobile-btn'),
  categoryList: document.querySelector('#categories__rendering'),
  categoryTabletBtn: document.querySelector('.category__tablet-btn'),
  categoryTabletOverlay: document.querySelector('#category-tab-overlay'),
  categoryDesktopBtn: document.querySelector('#category-desktop-btn'),
  categoryQuery: document.querySelectorAll('#category-overlay'),
};

window.addEventListener(
  'resize',
  throttle(() => changeWindow(), 250)
);

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

// function fetchCategory() {
//   query = evt.target.textContent;
//   fetchArticleSearch(query.toLowerCase());
// }

// refs.categoryQuery.addEventListener('click', fetchCategory);

async function renderCategoriesMobile() {
  const categories = await fetchApiCategory();

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
    refs.categoryMobileOverlay.style.overflowY = 'scroll';
  }
}

async function renderCategoriesTablet() {
  const categories = await fetchApiCategory();
  console.log(categories);
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

async function renderTabletOverlay() {
  refs.categoryTabletOverlay.classList.add('category__tablet-open');
  const categories = await fetchApiCategory();
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
    renderTabletOverlay();
    refs.categoryTabletOverlay.classList.add('category__tablet-open');
    refs.categoryTabletOverlay.style.overflowY = 'scroll';
  }
}

async function renderCategoriesDesktop() {
  const categories = await fetchApiCategory();
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

async function renderDesktopOverlay() {
  refs.categoryTabletOverlay.classList.add('category__tablet-open');
  const categories = await fetchApiCategory();
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
    renderDesktopOverlay();
    refs.categoryTabletOverlay.classList.add('category__tablet-open');
    refs.categoryTabletOverlay.style.overflowY = 'scroll';
  }
}
