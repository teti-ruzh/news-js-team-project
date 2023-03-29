
const favouriteList = document.querySelector('.favourite__list');
const errorImage = document.querySelector('.errorImage');

const myData = JSON.parse(localStorage.getItem('favorite'));

const image = new URL('../images/gallery/plugFoto.jpg', import.meta.url);
const svgA = new URL('../images/icons.svg', import.meta.url);
const svgB = 'icon-Vector';
const svgC = 'icon-icons8--1';

renderFavourite(myData);

function renderFavourite(myData) {
  const markup = myData
    .map(({ url, foto, section, title, newsAbstruct, newDataFormat }) => {
      return `<li class="news__item" >
  <div class="news__images-container">
    <a class="news__link" target="_blank" href="${url}"
      ><img class="news__foto" src="${foto}" alt=""
    /></a>

    <div class="news__category">
      <div class="news__category-text">${section}</div>
    </div>

    <div class="news__favorite">
      <button class="favorite__remove-button" type ='button'>
        Remove from favorite
        <svg class="favorite__remove-icon" width="16" height="16">
          <use href="${svgA}#${svgB}"></use>
        </svg>
      </button>
    </div>
  </div>

  <h2 class="news__title">${title}</h2>

  <div class="box">
    <p class="news__abstruct">${newsAbstruct}</p>

    <div class="news-card--position">
      <div class="news__data">${newDataFormat}</div>
      <div class="news__read-more">
        <a class="news__link" target="_blank" href="${url}">Read more</a>
      </div>
    </div>
  </div>
  <div class="news-box--overlay">
      <span class="news-box-text"> Have read 
      <svg class="news__favorite-icon" width="16" height="16">
            <use href="${svgA}#${svgC}"></use>
          </svg>
      </span>
    </div>
</li>
`;
    })
    .join('');

  favouriteList.innerHTML = markup;

  // // перевіркана і додавання заглушки з текстом

  if (myData.length === 0) {
    errorImage.classList.remove('none');
  } else {
    errorImage.classList.add('none');
  }
}

favouriteList.addEventListener('click', removeArticle);

function removeArticle(e) {
  if (e.target.classList.contains('favorite__remove-button')) {
    const listItem = e.target.closest('li');
    const title = listItem.querySelector('.news__title').textContent;
    // // видаляємо елемент з розмітки
    listItem.remove();
    // видаляємо елемент з localStorage
    const myData = JSON.parse(localStorage.getItem('favorite'));
    const newData = myData.filter(item => item.title !== title);
    localStorage.setItem('favorite', JSON.stringify(newData));

  // // перевіркана і додавання заглушки з текстом

    if (newData.length === 0) {
      errorImage.classList.remove('none');
    }
  }
}

