import { weatherBlock } from './weather-service';
import newsCardMarkup from './news-card-markup';

const API_KEY = 'RHHupiQoPYaFAPG2zSM05OivdA2ggJN2';
const URL_MOST_POPULAR =
  'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json';
const URL_ARTICLE_SEARCH =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const newsList = document.querySelector('.news__list');

const image = new URL('../images/gallery/plugFoto.jpg', import.meta.url);
const svgA = new URL('../images/icons.svg', import.meta.url);
const svgB = 'icon-Vector';
const svgC = 'icon-icons8--1';
let foto = '';

function renderNewDateFormat(publish_date) {
  let date = new Date(publish_date);

  return `${addLeadingZero(date.getDate())}/${addLeadingZero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

function renderApiNewDateFormat(publish_date) {
  if (!publish_date) {
    return '';
  }
  let date = new Date(publish_date);
  // console.log(date);
  // console.log(date.toISOString().slice(0, 10));

  // return date.toISOString().slice(0, 10);

  return `${String(addLeadingZero(date.getFullYear()))}-${String(
    addLeadingZero(date.getMonth() + 1)
  )}-${String(date.getDate())}`;

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

function cleanNewsGallery() {
  newsList.innerHTML = '';
}

// Відображення сторінки помилки
const errorImage = document.querySelector('.errorImage');
const paginationEl = document.querySelector('.page-pagination');
//============================================================================

//=========================================================================================================================================
// Відображення популярних статей. Загальна кільксть статей 20шт
// fetchMostpopularData();

async function fetchMostpopularData() {
  try {
    const response = await fetch(`${URL_MOST_POPULAR}?api-key=${API_KEY}`);

    const dataNews = await response.json();
    return dataNews.results;

    // renderNews(dataNews.results);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function renderNews(newsArray) {
  containerRenderNewsCardMarkup(newsArray);

  function containerRenderNewsCardMarkup(newsArray) {
    const markup = newsArray
      .map(({ url, media, section, title, abstract, published_date }) => {
        if (!media.length) {
          foto = image;
        } else {
          foto = media[0]['media-metadata'][2].url;
        }

        return newsCardMarkup(
          url,
          foto,
          section,
          title,
          abstract,
          published_date,
          svgA,
          svgB,
          svgC
        );
      })
      .join('');

    newsList.insertAdjacentHTML('beforeend', markup);
  }

  addWeatherWidget();

  // Фильтер по популярным новостям по ДАТЕ ПУБЛИКАЦИИ ==============

  const btnDayCalendar = document.querySelector('.wrapper-calendar .days');
  btnDayCalendar.addEventListener('click', onBtnDayCalendar);
  function onBtnDayCalendar(event) {
    cleanNewsGallery();

    let dataCalendar = localStorage.getItem('selectedDate');

    const newsPopularFilterData = newsArray.filter(
      news =>
        renderNewDateFormat(dataCalendar) ===
        renderNewDateFormat(news.published_date)
    );

    containerRenderNewsCardMarkup(newsPopularFilterData);

    // localStorage.setItem('selectedDate', '');
  }
}

//================================================================================================================
// 2023-25-03
// Відображення статей за пошуком у полі "input", що знаходиться у хедері сайту

const searchBtn = document.querySelector('.search');
const inputSearch = document.querySelector('.search__input');
let query = '';
let pagePagination = 0;
searchBtn.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  cleanNewsGallery();

  query = inputSearch.value;

  fetchArticleSearch();
  localStorage.setItem('selectedDate', '');

  // Додавання класу щоб прибрати відображення сторінки помилки
  errorImage.classList.add('visually-hidden');

  // При повторному пошуку відновлення видимості пагінатора
  paginationEl.classList.remove('hidden');
  //============================================================================
}

// function cleanNewsGallery() {
//   newsList.innerHTML = '';
// }

async function fetchArticleSearch() {
  try {
    const apiDate = renderApiNewDateFormat(
      localStorage.getItem('selectedDate')
    );

    let params = new URLSearchParams({
      q: query,
      'api-key': API_KEY,
    });
    console.log(apiDate);

    let fqParams = [];

    if (apiDate) {
      fqParams.push(`pub_date:${apiDate}`);
    }
    if (pagePagination) {
      fqParams.push(`page=${pagePagination}`);
    }

    if (fqParams.length) {
      params.set('fq', fqParams.join(' AND '));
    }

    const response = await fetch(`${URL_ARTICLE_SEARCH}?` + params.toString());

    const dataNews = await response.json();
    // перевірка на пустий масив і прибирання класу щоб сторінка помилки відобразилась
    if (dataNews.response.docs.length === 0) {
      errorImage.classList.remove('visually-hidden');

      // видалення пагінатора при помилці на сторінці
      paginationEl.classList.add('hidden');

      return;
    }
    //============================================================================
    renderNewsSearch(dataNews.response.docs);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function renderNewsSearch(newsArray) {
  const markup = newsArray
    .map(elements => {
      let {
        web_url: url,
        multimedia,
        section_name: section,
        headline,
        abstract,
        pub_date: published_date,
      } = elements;

      let title = headline.main;

      if (!multimedia.length) {
        foto = image;
      } else {
        // foto = image;
        foto = `https://static01.nyt.com/${multimedia[0].url}`;
      }

      return newsCardMarkup(
        url,
        foto,
        section,
        title,
        abstract,
        published_date,
        svgA,
        svgB,
        svgC
      );
    })
    .join('');

  newsList.insertAdjacentHTML('beforeend', markup);
}

//================================================================================================================
// 2023-27-03
// Відображення статей за КАТЕГОРІЯМИ у хедері

const gallerySections = document.querySelector('.container.category__section');
console.log(gallerySections);
let querySection = '';

gallerySections.addEventListener('click', onSearchSection);

function onSearchSection(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }

  cleanNewsGallery();

  querySection = event.target.textContent.toLowerCase();
  console.log(querySection);

  fetchArticleSearchSection();
  localStorage.setItem('selectedDate', '');
  errorImage.classList.add('visually-hidden');
  paginationEl.classList.remove('hidden');
}

async function fetchArticleSearchSection() {
  try {
    const apiDate = renderApiNewDateFormat(
      localStorage.getItem('selectedDate')
    );

    let params = new URLSearchParams({
      q: querySection,
      'api-key': API_KEY,
    });

    let fqParams = [];

    if (querySection) {
      fqParams.push(`section_name:${querySection}`);
    }
    if (apiDate) {
      fqParams.push(`pub_date:${apiDate}`);
    }

    if (fqParams.length) {
      params.set('fq', fqParams.join(' AND '));
    }

    const response = await fetch(`${URL_ARTICLE_SEARCH}?` + params.toString());

    const dataNews = await response.json();

    if (dataNews.response.docs.length === 0) {
      errorImage.classList.remove('visually-hidden');
      paginationEl.classList.add('hidden');
      return;
    }

    console.log(dataNews.response.docs);

    renderNewsSearch(dataNews.response.docs);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

//================================================================================================================
// 2023-26-03
// OVERLAY і функціонал кнопки add to favorite (Назар)

newsList.addEventListener('click', event => {
  const buttonFavoriteElement = event.target.closest('.news__favorite-button');
  if (buttonFavoriteElement) {
    const newsItem = buttonFavoriteElement.closest('.news__item');
    const overlayElement = newsItem.querySelector('.news-box-content');
    const favoriteButton = newsItem.querySelector('.news__favorite-button');
    overlayElement.textContent = favoriteButton.classList.contains(
      'news__favorite-button--active'
    )
      ? 'Add to favorite'
      : 'Remove from favorite';
    favoriteButton.classList.toggle('news__favorite-button--active');
  }
});

newsList.addEventListener('click', event => {
  const linkElement = event.target.closest('.news__link');
  if (linkElement) {
    const newsItem = linkElement.closest('.news__item');
    const overlayElement = newsItem.querySelector('.news-box--overlay');
    overlayElement.classList.add('news-box--overlay-active');
  }
});

//================================================================================================================
// Додамо віджет погоди Олексія
function addWeatherWidget() {
  const viewportWidth = window.innerWidth;
  let index = 0;
  if (viewportWidth < 768) {
    index = 0;
  } else if (viewportWidth >= 768 && viewportWidth < 1280) {
    index = 1;
  } else {
    index = 2;
  }
  newsList.insertBefore(weatherBlock, newsList.children[index]);
}

//================================================================================================================
//Фільтер популярних новин по даті

export { fetchMostpopularData, renderNews };
