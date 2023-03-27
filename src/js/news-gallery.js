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

//=========================================================================================================================================
// Відображення популярних статей. Загальна кільксть статей 20шт
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

export function renderNews(newsArray) {
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

  addWeatherWidget();
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

function cleanNewsGallery() {
  newsList.innerHTML = '';
}

async function fetchArticleSearch() {
  try {
    const response = await fetch(
      `${URL_ARTICLE_SEARCH}?q=${query}&api-key=${API_KEY}`
    );

    const dataNews = await response.json();

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

const gallerySections = document.querySelector('.gallery__sections');

let querySection = '';
let querySectionPubDate = '2023-02-10';

gallerySections.addEventListener('click', onSearchSection);

function onSearchSection(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  cleanNewsGallery();

  querySection = event.target.textContent;
  console.log(querySection);

  fetchArticleSearchSection();
}

async function fetchArticleSearchSection() {
  try {
    const response = await fetch(
      `${URL_ARTICLE_SEARCH}?api-key=${API_KEY}&fq=section_name:${querySection} AND pub_date:${querySectionPubDate}`
    );

    const dataNews = await response.json();
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
