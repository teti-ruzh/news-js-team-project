
// import { fetchApiSearchQuery } from './render-list-of-readed';


const STORAGE_KEY = 'add-read-more';
const errorImage = document.querySelector(".errorImage");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");

searchInput.addEventListener("submit", selectionNews);

 function selectionNews(e) {
    e.preventDefault();
   const query = e.currentTarget.elements.query.value.trim();
     if (!Boolean(query)) {
    // Дів в який внесли розмітку 
        //  Функція в якій знаходиться уся розмітка
        return;
     }
     



 if (query.length === 0) {
    errorImage.classList.remove('visually-hidden');
  }

}
