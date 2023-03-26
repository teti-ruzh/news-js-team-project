const STORAGE_KEY = 'add-read-more';

const refs = {
    readNewsList: document.querySelector('.read__list'),
  };

  renderReadedGallery();


  function renderReadedGallery() {
const readedNewsArray = JSON.parse(localStorage.getItem(STORAGE_KEY));

const markup = readedNewsArray.map(({id, date, card})=> {

const cardBeg = card.slice(0, length-305);
const cardEnd = card.slice(length-6, card.length);
const cardToRender = `${cardBeg}${cardEnd}`;
return cardToRender;

}).join('');

refs.readNewsList.insertAdjacentHTML('beforeend', markup);
};
