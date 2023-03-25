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

// Моя розмітка, закомічена 24-03-2023, 16:30
// function renderNews(imagesArray) {
//   let foto = '';
//   const markup = imagesArray
//     .map(({ url, media, section, title, abstract, published_date }) => {
//       if (!Boolean(media.length)) {
//         foto = `./images/gallery/test.jpg`;
//       } else {
//         foto = media[0]['media-metadata'][2].url;
//       }
//       console.log(foto);

//       return `<li class="news__item">
//               <a class="news__link" href="${url}">
//                 <img class="news__foto" src="${foto}" alt="" />
//               </a>

//               <div class="news__category">${section}</div>
//               <div class="news__favorite"></div>
//               <h2 class="news__title">${title}</h2>
//               <p class="news__abstruct">${abstract}</p>
//               <div>
//                 <div class="news__data">${published_date}</div>
//                 <div class="news__read-more">
//                   <a class="news__link" href="${url}">Read more</a>
//                 </div>
//               </div>
//             </li>`;
//     })
//     .join('');

//   newsList.insertAdjacentHTML('beforeend', markup);
// }

// Оновлена розмітка Назара 24-03-2023, 16-40
function renderNews(imagesArray) {
  let foto = '';
  const image = new URL('../images/gallery/plugFoto.jpg', import.meta.url);
  const svgA = new URL('../images/icons.svg', import.meta.url);
  const svgB = 'icon-heart-bordered';

  const markup = imagesArray
    .map(({ url, media, section, title, abstract, published_date }) => {
      if (!Boolean(media.length)) {
        foto = image;
      } else {
        foto = media[0]['media-metadata'][2].url;
      }

      const maxLength = 130;
      const threePoint = ['...'];
      let newsAbstruct = '';
      let abstractLength = abstract.split('').length;
      if (abstractLength > maxLength) {
        newsAbstruct = abstract
          .split('')
          .slice(0, maxLength)
          .concat(threePoint)
          .join('');
      } else {
        newsAbstruct = abstract;
      }

      let date = new Date(published_date);
      let newDataFormat = `${addLeadingZero(date.getDate())}/${addLeadingZero(
        date.getMonth()
      )}/${date.getFullYear()}`;

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

  <!-- <div class="news-box--overlay">
    <span class="news-box-text"> Already read </span>
  </div> -->
</li>
`;
    })
    .join('');

  newsList.insertAdjacentHTML('beforeend', markup);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
