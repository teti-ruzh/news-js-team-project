const STORAGE_KEY = 'add-read-more';

const refs = {
  readNewsGallery: document.querySelector('.news-gallery'),
  readErrorImage: document.querySelector('.errorImageRead'),
};

const svgPath = new URL('../images/icons.svg', import.meta.url);
const svgName = 'icon-arrow-down';
const svgB = 'icon-Vector';
const svgC = 'icon-icons8--1';
const readedNewsArray = JSON.parse(localStorage.getItem(STORAGE_KEY));

updateReadGalleryUI();

function updateReadGalleryUI() {
  const markup = renderReadedGallery();
  refs.readNewsGallery.innerHTML = markup;
  refs.readErrorImage.classList.add('visually-hidden');
}

function renderReadedGallery() {
  let containerMarkup = '';
  const readDatesArray = readedNewsArray.map(({ date }) => date);
  const ReadDate = readDatesArray
    .filter(date => date !== undefined)
    .filter((date, index, array) => array.indexOf(date) === index);
  const sortedReadDates = ReadDate.sort((a, b) => b.localeCompare(a));

  for (let i = 0; i < sortedReadDates.length; i += 1) {
    const cardMarkup = readedNewsArray.filter(
      news => news.date === sortedReadDates[i]
    )
    .sort(sortId)
    .map(news => readNewsCardMarkup(news)).join('');


    containerMarkup += `<div class="read-news__list">
      <button class="read-news__btn js-read-news-btn">
        <span>${sortedReadDates[i]}</span>
        <svg><use href="${svgPath}#${svgName}" width="14" height="14"></use></svg>
      </button>
      <ul class="news__list">
      ${cardMarkup}
      </ul>
    </div>`;
  }

  return containerMarkup;
}

// const cardmarkup = readedNewsArray
//   .map(({ id, date, card }) => {
//     // const cardBeg = card.slice(0, card.length-305);
//     // const cardEnd = card.slice(card.length-6, card.length);
//     // const cardToRender = `${cardBeg}${cardEnd}`;

//     const cardToRender = card.replace('news-box--overlay-active', '');
//     console.log(date);

//     return cardToRender;
//   })
//   .join('');

// refs.readNewsList.insertAdjacentHTML('beforeend', markup);

// function renderReadNewsCard({ card }) {
//   const cardToRender = card.replace('news-box--overlay-active', '');

//   return cardToRender;
// }

// Стрілочка "Розгорнути"

function addEventHandlers() {
  const btnsReadMore = document.querySelectorAll('.js-read-news-btn');

  btnsReadMore.forEach(btn =>
    btn.addEventListener('click', onReadNewsBtnClick)
  );
}

function onReadNewsBtnClick({ currentTarget }) {
  currentTarget.classList.toggle('isOpen');
}

addEventHandlers();

// {/* <svg><use href="${svgPath}#${svgName}"></use></svg> */}


function readNewsCardMarkup
  (item) {
    return `<li class="news__item">
    <div class="news__images-container">
      <a class="news__link" target="_blank" href="${item.url}"
        ><img class="news__foto" src="${item.foto}" alt=""
      /></a>
  
      <div class="news__category">
        <div class="news__category-text">${item.section}</div>
      </div>
  
      <div class="news__favorite">
        <button class="news__favorite-button">
          <span class="news-box-content">Add to favorite</span>
          <svg class="news__favorite-icon" width="16" height="16">
            <use href="${svgPath}#${svgB}"></use>
          </svg>
        </button>
      </div>
    </div>
  
    <h2 class="news__title">${item.title}</h2>
  
    <div class="box">
      <p class="news__abstruct">${item.abstract}</p>
  
      <div class="news-card--position">
        <div class="news__data">${item.publishDate}</div>
        <div class="news__read-more">
          <a class="news__link" target="_blank" href="${item.url}">Read more</a>
        </div>
      </div>
    </div>
  
  <div class="news-box--overlay">
      <span class="news-box-text"> Already read 
      <svg class="news__favorite-icon" width="16" height="16">
            <use href="${svgPath}#${svgC}"></use>
          </svg>
      </span>
    </div>
  </li>
  `;
  };


  refs.readNewsGallery.addEventListener('click', onFavClick);

  function onFavClick(event) {
    const btnFavorite = event.target.closest('.news__favorite-button');
  if (btnFavorite) {
    const newsItem = btnFavorite.closest('.news__item');
    const overlayElement = newsItem.querySelector('.news-box-content');
    const favoriteButton = newsItem.querySelector('.news__favorite-button');
    overlayElement.textContent = favoriteButton.classList.contains(
      'news__favorite-button--active')
      ? 'Add to favorite'
      : 'Remove from favorite';
    favoriteButton.classList.toggle('news__favorite-button--active');
  }
}

function sortId(a,b){
  if(a.clickID>b.clickID)return -1;
  if(a.clickID<b.clickID)return 1;
  return 0;
}