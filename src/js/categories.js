import { fetchApiCategory } from './news-fetch-service';

const othersBtn = document.querySelector('#others-btn');
const categoryList = document.querySelector('#category-btn');

categoryList.addEventListener('click', getCategory);

async function getCategory() {
  const categories = await fetchApiCategory().then(categories => {
    return categories.map(category => category.display_name);
  });
  return categories;
}

async function renderCategoryButtons() {
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

renderCategoryButtons();
