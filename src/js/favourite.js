const favouriteList = document.querySelector('.favourite__list');
favouriteList.addEventListener('click', removeArticle);

const filteredData = [
  {
    uri: 'nyt://article/5c326d97-c547-50e9-8ad0-83ee9305f543',
    url: 'https://www.nytimes.com/2023/03/25/world/europe/volunteers-us-ukraine-lies.html',
    id: 100000008820617,
    asset_id: 100000008820617,
    source: 'New York Times',
    published_date: '2023-03-25',
    updated: '2023-03-26 08:25:41',
    section: 'World',
    subsection: 'Europe',
    nytdsection: 'world',
    adx_keywords:
      'Russian Invasion of Ukraine (2022);Defense and Military Forces;Frauds and Swindling;Volunteers and Community Service;Ukraine;Russia;United States',
    column: null,
    byline: 'By Justin Scheck and Thomas Gibbons-Neff',
    type: 'Article',
    title:
      'Stolen Valor: The U.S. Volunteers in Ukraine Who Lie, Waste and Bicker',
    abstract:
      'People who would not be allowed anywhere near the battlefield in a U.S.-led war are active on the Ukrainian front, with ready access to American weapons.',
    des_facet: [
      'Russian Invasion of Ukraine (2022)',
      'Defense and Military Forces',
      'Frauds and Swindling',
      'Volunteers and Community Service',
    ],
    org_facet: [],
    per_facet: [],
    geo_facet: ['Ukraine', 'Russia', 'United States'],
    media: [
      {
        type: 'image',
        subtype: 'photo',
        caption:
          'Axel Vilhelmsen trained Ukrainian soldiers last year as part of the Mozart Group, which two former Marines established to help Ukraine. It disbanded after one founder sued the other, alleging theft and harassment.',
        copyright: 'Laura Boushnak for The New York Times',
        approved_for_syndication: 1,
        'media-metadata': [
          {
            url: 'https://static01.nyt.com/images/2023/03/23/multimedia/00Ukraine-volunteers-01-fmbk/00Ukraine-volunteers-01-fmbk-thumbStandard.jpg',
            format: 'Standard Thumbnail',
            height: 75,
            width: 75,
          },
          {
            url: 'https://static01.nyt.com/images/2023/03/23/multimedia/00Ukraine-volunteers-01-fmbk/00Ukraine-volunteers-01-fmbk-mediumThreeByTwo210.jpg',
            format: 'mediumThreeByTwo210',
            height: 140,
            width: 210,
          },
          {
            url: 'https://static01.nyt.com/images/2023/03/23/multimedia/00Ukraine-volunteers-01-fmbk/00Ukraine-volunteers-01-fmbk-mediumThreeByTwo440.jpg',
            format: 'mediumThreeByTwo440',
            height: 293,
            width: 440,
          },
        ],
      },
    ],
    eta_id: 0,
  },
  {
    uri: 'nyt://article/4012fe22-2b0b-5e44-80f0-331cac8ed8e5',
    url: 'https://www.nytimes.com/2023/03/26/world/middleeast/judiciary-overhaul-benjamin-netanyahu-israel-parliament.html',
    id: 100000008830075,
    asset_id: 100000008830075,
    source: 'New York Times',
    published_date: '2023-03-26',
    updated: '2023-03-27 10:33:09',
    section: 'World',
    subsection: 'Middle East',
    nytdsection: 'world',
    adx_keywords:
      'Politics and Government;Courts and the Judiciary;Demonstrations, Protests and Riots;Defense and Military Forces;Netanyahu, Benjamin;Gallant, Yoav;Israel',
    column: null,
    byline: 'By Patrick Kingsley',
    type: 'Article',
    title: 'Israel Boils as Netanyahu Ousts Minister Who Bucked Court Overhaul',
    abstract:
      'Protests broke out shortly after Prime Minister Benjamin Netanyahu fired the defense minister, who had called for a halt to efforts to weaken the judiciary.',
    des_facet: [
      'Politics and Government',
      'Courts and the Judiciary',
      'Demonstrations, Protests and Riots',
      'Defense and Military Forces',
    ],
    org_facet: [],
    per_facet: ['Netanyahu, Benjamin', 'Gallant, Yoav'],
    geo_facet: ['Israel'],
    media: [
      {
        type: 'image',
        subtype: 'photo',
        caption:
          'A raucous demonstration erupted in Tel Aviv late Sunday after Prime Minister Benjamin Netanyahu dismissed the defense minister and his government pressed on with a judicial overhaul.',
        copyright: 'Oren Ziv/Associated Press',
        approved_for_syndication: 1,
        'media-metadata': [
          {
            url: 'https://static01.nyt.com/images/2023/03/26/multimedia/26israel-new-mwcq-promo/26israel-new-mwcq-thumbStandard.jpg',
            format: 'Standard Thumbnail',
            height: 75,
            width: 75,
          },
          {
            url: 'https://static01.nyt.com/images/2023/03/26/multimedia/26israel-new-mwcq-promo/26israel-new-mwcq-mediumThreeByTwo210.jpg',
            format: 'mediumThreeByTwo210',
            height: 140,
            width: 210,
          },
          {
            url: 'https://static01.nyt.com/images/2023/03/26/multimedia/26israel-new-mwcq-promo/26israel-new-mwcq-mediumThreeByTwo440.jpg',
            format: 'mediumThreeByTwo440',
            height: 293,
            width: 440,
          },
        ],
      },
    ],
    eta_id: 0,
  },
];

localStorage.setItem('myData', JSON.stringify(filteredData));
const myData = JSON.parse(localStorage.getItem('myData'));
renderFavourite(myData);

function renderFavourite(myData) {
  let foto = '';
  const image = new URL('../images/gallery/plugFoto.jpg', import.meta.url);
  const svgA = new URL('../images/icons.svg', import.meta.url);
  const svgB = 'icon-heart-bordered';

  const markup = myData
    .map(({ id, url, media, section, title, abstract, published_date }) => {
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

      return `<li class="news__item" data-id =${id}>
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

  <!-- <div class="news-box--overlay">
    <span class="news-box-text"> Already read </span>
  </div> -->
</li>
`;
    })
    .join('');

  favouriteList.innerHTML = markup;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function removeArticle(e) {
  if (e.target.classList.contains('news__remove-button')) {
    const listItem = e.target.closest('li');
    const itemId = listItem.dataset.id;

    // // видаляємо елемент з розмітки
    listItem.remove();
    // видаляємо елемент з localStorage
    const myData = JSON.parse(localStorage.getItem('myData'));
    const filteredData = myData.filter(item => item.id !== Number(itemId));
    localStorage.setItem('myData', JSON.stringify(filteredData));
  }
}
