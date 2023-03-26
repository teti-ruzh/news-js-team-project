const STORAGE_KEY = 'add-read-more';

const refs = {
  homeNewsList: document.querySelector('.news__list'),
};

refs.homeNewsList.addEventListener('click', onReadMoreBtnClick);
let newsObj = {};
let readedNewsData = [];

 populateNewsData();


function onReadMoreBtnClick(event) {
  
    const readMoreBtn = event.target.closest('.news__link');
  if (readMoreBtn) {
    const newsItem = readMoreBtn.closest('.news__item').outerHTML;
    const clickDate = new Date();
    const date = `${clickDate.getDate()}/${clickDate.getMonth()}/${clickDate.getFullYear()}`
      clickDate.getFullYear();
    newsObj.id = clickDate.getTime();
    newsObj.date = date;
    newsObj.card = `${newsItem}`;
    readedNewsData.push(newsObj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readedNewsData));
  }
}


function populateNewsData() {
  const savedNewsData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if(!savedNewsData) {
    readedNewsData = [];
} else {readedNewsData = JSON.parse(localStorage.getItem(STORAGE_KEY))};
}



// function renderReadedGallery() {
// const readedNewsArray = JSON.parse(localStorage.getItem(STORAGE_KEY));
// const markup = readedNewsArray.map(({id, date, card})=> {
// return card;
// }).join('');

// readedNewsList.insertAdjacentHTML('beforeend', markup);

// };


