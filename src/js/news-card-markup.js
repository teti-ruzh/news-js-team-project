export default function newsCardMarkup(
  id,
  url,
  foto,
  section,
  title,
  abstract,
  published_date,
  svgA,
  svgB,
  svgC
) {
  return `<li class="news__item" data-id =${id}>
  <div class="news__images-container">
    <a class="news__link" target="_blank" href="${url}"
      ><img class="news__foto" src="${foto}" alt=""
    /></a>

    <div class="news__category">
      <div class="news__category-text">${section}</div>
    </div>

    <div class="news__favorite">
      <button class="news__favorite-button">
        <span class="news-box-content">Add to favorite</span>
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
    date.getMonth() + 1
  )}/${date.getFullYear()}`;

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}
