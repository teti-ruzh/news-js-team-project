import throttle from 'lodash.throttle';

import { ApiCategory } from './news-fetch-service';
import { renderNews } from './news-gallery';

const refs = {
  categoryOverlay: document.querySelector('.category__overlay'),
  categoryMobileBtn: document.querySelector('.category__mobile-btn'),
  categoryList: document.querySelector('.category__list-rendering'),
  categoryTabletBtn: document.querySelector('.category__tablet-btn'),
  categoryTabletOverlay: document.querySelector(
    '.category__tablet-btn-container .category__overlay'
  ),
  categoryDesktopBtn: document.querySelector('#category-desktop-btn'),
  listenerMobile: document.querySelector('.category__mobile'),
  listenerTablet: document.querySelector('.category__tablet'),
};

let categories = [];

const API_KEY = 'api-key=nb4kIc3A28NYQPkulI6xtxUAkPze1R9u';
const newApiCategory = new ApiCategory();

refs.categoryMobileBtn.addEventListener('click', overlayIsShown);
refs.categoryTabletBtn.addEventListener('click', overlayIsShown);

async function rendering() {
  await getCategories();
  if (window.matchMedia('(min-width: 1280px)').matches) {
    renderDeskCategories(categories);
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    renderTabCategories(categories);
  } else if (window.matchMedia('(max-width: 767px)').matches) {
    renderCategories(categories);
  }
  console.log(categories);
}
rendering();

async function getCategories() {
  const categoriesArr = await newApiCategory.fetchApiCategory();
  categories = categoriesArr.map(category => category.display_name);
}

function renderCategories(categories) {
  categories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category__item');
    categoryItem.textContent = category;
    categoryItem.addEventListener('click', () => {
      fetch(
        `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?${API_KEY}`
      )
        .then(response => response.json())
        .then(data => renderNews(data.results));
    });
    refs.categoryOverlay.insertAdjacentHTML(
      'beforeend',
      categoryItem.outerHTML
    );
  });
}

function renderTabCategories(categories) {
  const firstFourCategories = categories.slice(0, 4);
  const remainingCategories = categories.slice(4, categories.length);

  firstFourCategories.forEach((category, index) => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add(
      'category__btn',
      'category__item',
      'category__tablet-btn'
    );
    categoryItem.textContent = category;
    categoryItem.addEventListener('click', () => {
      fetch(
        `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?${API_KEY}`
      )
        .then(response => response.json())
        .then(data => renderNews(data.results));
    });
    refs.categoryList.appendChild(categoryItem);
  });

  remainingCategories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category__item');
    categoryItem.textContent = category;
    categoryItem.addEventListener('click', () => {
      fetch(
        `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?${API_KEY}`
      )
        .then(response => response.json())
        .then(data => renderNews(data.results));
    });
    refs.categoryTabletOverlay.insertAdjacentHTML(
      'beforeend',
      categoryItem.outerHTML
    );
  });
}

function renderDeskCategories(categories) {
  const firstSixCategories = categories.slice(0, 6);
  const remainingCategories = categories.slice(6, categories.length);

  firstSixCategories.forEach((category, index) => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add(
      'category__btn',
      'category__item',
      'category__tablet-btn'
    );
    categoryItem.textContent = category;
    categoryItem.addEventListener('click', () => {
      fetch(
        `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?${API_KEY}`
      )
        .then(response => response.json())
        .then(data => renderNews(data.results));
    });

    refs.categoryList.appendChild(categoryItem);
  });

  remainingCategories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category__item');
    categoryItem.textContent = category;
    categoryItem.addEventListener('click', () => {
      fetch(
        `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?${API_KEY}`
      )
        .then(response => response.json())
        .then(data => renderNews(data.results));
    });
    refs.categoryTabletOverlay.insertAdjacentHTML(
      'beforeend',
      categoryItem.outerHTML
    );
  });
}

function overlayIsShown() {
  if (
    refs.categoryOverlay.classList.contains('category__overlay-open') ||
    refs.categoryTabletOverlay.classList.contains('category__overlay-open')
  ) {
    refs.categoryOverlay.classList.remove('category__overlay-open');
    refs.categoryTabletOverlay.classList.remove('category__overlay-open');
  } else {
    refs.categoryOverlay.classList.add('category__overlay-open');
    refs.categoryTabletOverlay.classList.add('category__overlay-open');
  }
}
