
// import { renderFavourite } from './favourite.js';



const errorImage = document.querySelector(".errorImage");
const search = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");
const myData = JSON.parse(localStorage.getItem('favorite'));

searchInput.addEventListener("submit", selectionNews);

 function selectionNews(e) {
    e.preventDefault();
   const query = e.currentTarget.elements.query.value.trim();
     if (!Boolean(query)) {
    // Дів в який внесли розмітку
      //  renderFavourite(myData);
       errorImage.classList.add('visually-hidden');
        return;
     }
     
  let markup = '';
  let foundNews = [];

markup = myData.map(
    ({ id, url, foto, section, title, newsAbstruct, newDataFormat }) => {
      if (title.toLowerCase().includes(query.toLowerCase())) {
        foundNews.push({
          id: `${id}`,
          url: `${url}`,
          foto: `${foto}`,
          section: `${section}`,
          title: `${title}`,
           newsAbstruct: `${ newsAbstruct}`,
          newDataFormat: `${newDataFormat}`,
        });
      }
    }
  );
  //  renderFavourite(myData);
  if (foundNews.length === 0) {
    errorImage.classList.remove('visually-hidden');
  }
}
   
   
   

