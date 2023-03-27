const STORAGE_KEY = 'add-read-more';

const refs = {
  readNewsList: document.querySelector('.read__list'),
  readNewsGallery: document.querySelector('.news-gallery'),
};

const readedNewsArray = JSON.parse(localStorage.getItem(STORAGE_KEY));

updateReadGalleryUI();

function updateReadGalleryUI() {
  const markup = renderReadedGallery();
  refs.readNewsGallery.innerHTML = markup;
}

function renderReadedGallery() {
  let containerMarkup = '';
  const readDatesArray = readedNewsArray.map(({ date }) => date);
  const ReadDate = readDatesArray
    .filter(date => date !== undefined)
    .filter((date, index, array) => array.indexOf(date) === index);
  const sortedReadDates = ReadDate.sort((a, b) => b.localeCompare(a));

  for (let i = 0; i < sortedReadDates.length; i += 1) {
    const DatedNews = readedNewsArray.filter(
      item => item.date === sortedReadDates[i]
    );
    const cardMarkup = DatedNews.map(news => renderReadNewsCard(news)).join('');

    // const svgPath = new URL('../images/icons.svg', import.meta.url);
    // const svgName = 'icon-arrow-down';

    containerMarkup += `<div class="read-news__list">
      <button class="read-news__btn js-read-news-btn">
        <span>${sortedReadDates[i]}</span>
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

function renderReadNewsCard({ card }) {
  const cardToRender = card.replace('news-box--overlay-active', '');

  return cardToRender;
}

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