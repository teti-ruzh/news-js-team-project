const STORAGE_KEY = 'add-read-more';

const refs = {
  newsList: document.querySelector('.news__list'),
};

refs.newsList.addEventListener('click', onReadMoreBtnClick);
let newsObj = {};
let readedNewsData = [];

function onReadMoreBtnClick(event) {
  event.preventDefault();

  const readMoreBtn = event.target.closest('.news__link');
  if (readMoreBtn) {
    const newsItem = readMoreBtn.closest('.news__item');
    const clickDate = new Date();
    const date =
      +clickDate.getDate() +
      '/' +
      clickDate.getMonth() +
      '/' +
      clickDate.getFullYear();
    // console.log(clickDate);
    newsObj.id = clickDate;
    newsObj.date = date;
    newsObj.card = newsItem;

    readedNewsData.push(newsObj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readedNewsData));
  }
}
