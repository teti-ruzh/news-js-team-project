const API_KEY = 'RHHupiQoPYaFAPG2zSM05OivdA2ggJN2';
const URL_MOST_POPULAR =
  'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json';
const URL_ARTICLE_SEARCH =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const newsList = document.querySelector('.news__list');

fetchMostpopularData();

async function fetchMostpopularData() {
  try {
    const response = await fetch(`${URL_MOST_POPULAR}?api-key=${API_KEY}`);
    const dataNews = await response.json();

    renderNews(dataNews.results);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function renderNews(newsArray) {
  let foto = '';
  const image = new URL('../images/gallery/plugFoto.jpg', import.meta.url);
  const svgA = new URL('../images/icons.svg', import.meta.url);
  const svgB = 'icon-heart-bordered';
  const svgC = 'icon-icons8--1';

  const markup = newsArray
    .map(({ url, media, section, title, abstract, published_date }) => {
      if (!media.length) {
        foto = image;
      } else {
        foto = media[0]['media-metadata'][2].url;
      }

      return `<li class="news__item">
  <div class="news__images-container">
    <a class="news__link" target="_blank" href="${url}"
      ><img class="news__foto" src="${foto}" alt=""
    /></a>

    <div class="news__category">
      <div class="news__category-text">${section}</div>
    </div>

    <div class="news__favorite">
      <button class="news__favorite-button">
        Add to favorite
        <svg class="news__favorite-icon" width="16" height="16">
          <use href="${svgA}#${svgB}"></use>
        </svg>
      </button>
    </div>
  </div>

  <h2 class="news__title">${cutAbstractAddPoints(title, 45)}</h2>

  <div class="box">
    <p class="news__abstruct">${cutAbstractAddPoints(abstract, 130)}</p>

    <div class="news-card--position">
      <div class="news__data">${renderNewDateFormat(published_date)}</div>
      <div class="news__read-more">
        <a class="news__link" target="_blank" href="${url}">Read more</a>
      </div>
    </div>
  </div>

<div class="news-box--overlay">
    <span class="news-box-text"> Already read 
    <svg class="news__favorite-icon" width="16" height="16">
          <use href="${svgA}#${svgC}"></use>
        </svg>
    </span>
  </div>
</li>
`;
    })
    .join('');

  newsList.insertAdjacentHTML('beforeend', markup);
}

function cutAbstractAddPoints(abstract_news, maxLength) {
  const threePoint = ['...'];

  let abstractLength = abstract_news.split('').length;
  if (abstractLength > maxLength) {
    return abstract_news
      .split('')
      .slice(0, maxLength)
      .concat(threePoint)
      .join('');
  } else {
    return abstract_news;
  }
}

function renderNewDateFormat(publish_date) {
  let date = new Date(publish_date);

  return `${addLeadingZero(date.getDate())}/${addLeadingZero(
    date.getMonth()
  )}/${date.getFullYear()}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//================================================================================================================
// 2023-25-03
// Відображення статей за пошуком у полі "input", що знаходиться у хедері сайту

const searchBtn = document.querySelector('.search');
const inputSearch = document.querySelector('.search__input');
let query = '';

searchBtn.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  cleanNewsGallery();
  query = inputSearch.value;

  fetchArticleSearch();
}

async function fetchArticleSearch() {
  try {
    const a = 5;
    const response = await fetch(
      `${URL_ARTICLE_SEARCH}?q=${query}&api-key=${API_KEY}&page=${a}`
    );
    const dataNews = await response.json();

    console.log(dataNews);
    console.log(dataNews.response);
    console.log(dataNews.response.docs);

    renderNewsSearch(dataNews.response.docs);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function renderNewsSearch(newsArray) {
  let foto = '';
  const image = new URL('../images/gallery/plugFoto.jpg', import.meta.url);
  const svgA = new URL('../images/icons.svg', import.meta.url);
  const svgB = 'icon-heart-bordered';
  const svgC = 'icon-icons8--1';

  const markup = newsArray
    .map(
      ({ web_url, multimedia, section_name, headline, abstract, pub_date }) => {
        if (!multimedia.length) {
          foto = image;
        } else {
          // foto = image;
          foto = `https://static01.nyt.com/${multimedia[0].url}`;
        }

        return `<li class="news__item">
  <div class="news__images-container">
    <a class="news__link" target="_blank" href="${web_url}"
      ><img class="news__foto" src="${foto}" alt=""
    /></a>

    <div class="news__category">
      <div class="news__category-text">${section_name}</div>
    </div>

    <div class="news__favorite">
      <button class="news__favorite-button">
        Add to favorite
        <svg class="news__favorite-icon" width="16" height="16">
          <use href="${svgA}#${svgB}"></use>
        </svg>
      </button>
    </div>
  </div>

  <h2 class="news__title">${cutAbstractAddPoints(headline.main, 45)}</h2>

  <div class="box">
    <p class="news__abstruct">${cutAbstractAddPoints(abstract, 130)}</p>

    <div class="news-card--position">
      <div class="news__data">${renderNewDateFormat(pub_date)}</div>
      <div class="news__read-more">
        <a class="news__link" target="_blank" href="${web_url}">Read more</a>
      </div>
    </div>
  </div>

  <div class="news-box--overlay">
    <span class="news-box-text"> Already read 
    <svg class="news__favorite-icon" width="16" height="16">
          <use href="${svgA}#${svgC}"></use>
        </svg>
</span>
  </div>
</li>
`;
      }
    )
    .join('');

  newsList.insertAdjacentHTML('beforeend', markup);
}

//================================================================================================================
// 2023-26-03
// OVERLAY і функціонал кнопки add to favorite

newsList.addEventListener('click', (event) => {
  const buttonFavoriteElement = event.target.closest('.news__favorite-button');
  if (buttonFavoriteElement) {
    const newsItem = buttonFavoriteElement.closest('.news__item');
    const overlayElement = newsItem.querySelector('.news__favorite-button');
    overlayElement.classList.toggle('news__favorite-button--active');
  }
});


newsList.addEventListener('click', (event) => {
  const linkElement = event.target.closest('.news__link');
  if (linkElement) {
    const newsItem = linkElement.closest('.news__item');
    const overlayElement = newsItem.querySelector('.news-box--overlay');
    overlayElement.classList.add('news-box--overlay-active');
  }
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function cleanNewsGallery() {
  newsList.innerHTML = '';
}


