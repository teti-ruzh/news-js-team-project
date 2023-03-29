import throttle from 'lodash.throttle';

import { ApiCategory } from './news-fetch-service';

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
  categoryIcon: document.querySelectorAll('.category__arrow-icon-down'),
  categoryItem: document.querySelectorAll('.category__item'),
};

let categories = [];
let checkedCategory = [];

const newApiCategory = new ApiCategory();

refs.categoryMobileBtn.addEventListener('click', overlayIsShown);
refs.categoryTabletBtn.addEventListener('click', overlayIsShown);
window.addEventListener(
  'resize',
  throttle(() => rendering(categories), 250)
);
// window.addEventListener('click', () => {
//   refs.categoryOverlay.classList.remove('category__overlay-open');
//   refs.categoryTabletOverlay.classList.remove('category__overlay-open');
// });

waitingCategories();

async function getCategories() {
  const categoriesArr = await newApiCategory.fetchApiCategory();
  categories = categoriesArr.map(category => category.display_name);
}

async function waitingCategories() {
  await getCategories();
  rendering(categories);
}

function rendering(categories) {
  refresh();

  if (window.matchMedia('(min-width: 1280px)').matches) {
    renderDeskCategories(categories);
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    renderTabCategories(categories);
  } else {
    renderCategories(categories);
  }
}

function refresh() {
  refs.categoryOverlay.innerHTML = '';
  refs.categoryList.innerHTML = '';
  refs.categoryTabletOverlay.innerHTML = '';
}

function renderCategories(categories) {
  categories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category__item');
    categoryItem.textContent = category;

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

    refs.categoryList.insertAdjacentHTML('beforeend', categoryItem.outerHTML);
  });

  remainingCategories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category__item');
    categoryItem.textContent = category;

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

    refs.categoryList.insertAdjacentHTML('beforeend', categoryItem.outerHTML);
  });

  remainingCategories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category__item');
    categoryItem.textContent = category;

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
    refs.categoryMobileBtn.classList.remove('category__btn-active');
    refs.categoryTabletBtn.classList.remove('category__btn-active');
    refs.categoryIcon.forEach(icon => icon.classList.remove('category__icon'));
  } else {
    refs.categoryOverlay.classList.add('category__overlay-open');
    refs.categoryTabletOverlay.classList.add('category__overlay-open');
    refs.categoryMobileBtn.classList.add('category__btn-active');
    refs.categoryTabletBtn.classList.add('category__btn-active');
    refs.categoryIcon.forEach(icon => icon.classList.add('category__icon'));
  }
  return;
}

refs.categoryList.addEventListener('click', event => {
  // refs.categoryItem.classList.remove('category__btn-active');
  const target = event.target;
  if (target.nodeName === 'LI') {
    target.classList.add('category__btn-active');
  }
  console.log(checkedCategory);
});

refs.categoryOverlay.addEventListener('click', event => {
  // refs.categoryItem.classList.remove('category__btn-active');
  const target = event.target;
  if (target.nodeName === 'LI') {
    target.classList.add('category__item-active');
    refs.categoryOverlay.classList.remove('category__overlay-open');
  }
});

refs.categoryTabletOverlay.addEventListener('click', event => {
  // refs.categoryItem.classList.remove('category__btn-active');
  const target = event.target;
  if (target.nodeName === 'LI') {
    target.classList.add('category__item-active');
    refs.categoryTabletOverlay.classList.remove('category__overlay-open');
  }
});
