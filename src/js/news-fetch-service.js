// Creating fetch from API
const URL_MOST_POPULAR =
  'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json';
const API_KEY = 'RHHupiQoPYaFAPG2zSM05OivdA2ggJN2';

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

function renderNews(imagesArray) {
  let foto = '';
  const markup = imagesArray
    .map(({ url, media, section, title, abstract, published_date }) => {
      if (!Boolean(media.length)) {
        foto = `./images/gallery/test.jpg`;
      } else {
        foto = media[0]['media-metadata'][2].url;
      }
      console.log(foto);

      return `<li class="news__item">
              <a class="news__link" href="${url}">
                <img class="news__foto" src="${foto}" alt="" />                
              </a>

              <div class="news__category">${section}</div>
              <div class="news__favorite"></div>
              <h2 class="news__title">${title}</h2>
              <p class="news__abstruct">${abstract}</p>
              <div>
                <div class="news__data">${published_date}</div>
                <div class="news__read-more">
                  <a class="news__link" href="${url}">Read more</a>
                </div>
              </div>
            </li>`;
    })
    .join('');

  newsList.insertAdjacentHTML('beforeend', markup);
}
