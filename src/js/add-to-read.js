const STORAGE_KEY = 'add-read-more';

const refs = {
  homeNewsList: document.querySelector('.news__list'),
};

refs.homeNewsList.addEventListener('click', onReadMoreBtnClick);
let readedNewsData = [];

populateNewsData();

function onReadMoreBtnClick(event) {
  const readMoreBtn = event.target.closest('.news__link');
  if (readMoreBtn) {
    // const newsItem = readMoreBtn.closest('.news__item').outerHTML;
    const newsItem = readMoreBtn.closest('.news__item');
    const title = newsItem.querySelector('.news__title').textContent;
    const section = newsItem.querySelector('.news__category-text').textContent;
    const foto = newsItem.querySelector('.news__foto').getAttribute('src');
    const abstract = newsItem.querySelector('.news__abstruct').textContent;
    const publishDate = newsItem.querySelector('.news__data').textContent;
    const url = newsItem.querySelector('.news__link').getAttribute('href');

    const clickDate = new Date();
    const clickID = clickDate.getTime();
    const day = clickDate.getDate().toString().padStart(2,'0');
    const month = (clickDate.getMonth()+1).toString().padStart(2,'0');
    const date = `${day}/${month}/${clickDate.getFullYear()}`;
    clickDate.getFullYear();
    
    // if (readedNewsData.length > 0) {
    //   for (let i=0; i < readedNewsData.length; i+=1) {
    //      if (readedNewsData[i].title === title) {
    //       readedNewsData[i] = {};
    //      };
    //   };
    // };

    // let newsObj = {};
    // newsObj.id = clickDate.getTime();
    // newsObj.date = date;
    // newsObj.card = `${newsItem}`;
    

    const newsObj = { url, foto, section, title, abstract, publishDate, clickID, date };

    readedNewsData.push(newsObj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readedNewsData));
  }
}

function populateNewsData() {
  const savedNewsData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedNewsData) {
    readedNewsData = [];
  } else {
    readedNewsData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
}
