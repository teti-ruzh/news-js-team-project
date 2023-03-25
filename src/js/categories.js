import { fetchApiCategory } from './news-fetch-service';

const othersBtn = document.querySelector('#others-btn');
const categoryList = document.querySelector('#category-btn');
const categoryListMobOverlay = document.querySelector('#category-mob-overlay');
const categoryMobileBtn = document.querySelector('.category__mobile-btn');
const categoryRemoveList = document.querySelector('.category__list');

categoryList.addEventListener('click', getCategory);
categoryMobileBtn.addEventListener('click', renderCategoriesMobile);
// categoryRemoveList.removeEventListener('click', removeBtnListener);

if (window.matchMedia('(min-width: 1280px)').matches) {
  renderCategoryButtonsDesktop();
} else if (window.matchMedia('(min-width: 768px)').matches) {
  renderCategoryButtonsTablet();
} else {
  categoryMobileBtn.addEventListener('click', renderCategoriesMobile);
}

async function getCategory() {
  const categories = await fetchApiCategory().then(categories => {
    return categories.map(category => category.display_name);
  });
  return categories;
}

async function renderCategoryButtonsDesktop() {
  const sections = await getCategory();
  const sortSections = sections.slice(0, 6);

  let btnRender = '';
  for (let i = 0; i < sortSections.length; i++) {
    const section = sortSections[i];
    btnRender += `<li class="category__item">
      <button class="category__btn" type="button">
          ${section}
      </button>
    </li>`;
  }
  categoryList.innerHTML = btnRender;
}

async function renderCategoryButtonsTablet() {
  const sections = await getCategory();
  const sortSections = sections.slice(0, 4);

  let btnRender = '';
  for (let i = 0; i < sortSections.length; i++) {
    const section = sortSections[i];
    btnRender += `<li class="category__item">
      <button class="category__btn" type="button">
          ${section}
      </button>
    </li>`;
  }
  categoryList.innerHTML = btnRender;
}

async function renderCategoriesMobile() {
  categoryListMobOverlay.classList.add('category-open');

  const sections = await getCategory();

  let btnRender = '';
  for (let i = 0; i <= sections.length; i++) {
    const section = sections[i];
    btnRender += `<li class="category__mobile-item">
      <a class="category__mobile-link" href="">
          ${section}
      </a>
    </li>`;
  }

  categoryListMobOverlay.innerHTML = btnRender;
}

function removeBtnListener() {
  categoryListMobOverlay.classList.remove('category-open');
}
