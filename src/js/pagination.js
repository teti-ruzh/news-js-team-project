import { fetchMostpopularData, renderNews } from './news-gallery';

const newsList = document.querySelector('.news__list');
const listPaginationEl = document.querySelector('.page-pagination__list');
const btnPrevPg = document.querySelector('button.page-pagination__prev-btn');
const btnNextPg = document.querySelector('button.page-pagination__next-btn');
const pagePaginationEl = document.querySelector('.page-pagination');

let currenPage = 1;
let newsPerPage = 0;

fetchMostpopularData().then(news => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    newsPerPage = 4;
  } else if (window.matchMedia('(min-width: 1280px)').matches) {
    newsPerPage = 8;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    newsPerPage = 7;
  }

  const pagesCount = Math.ceil(news.length / newsPerPage);

  function displayList(arrData, newsPerPage, page) {
    newsList.innerHTML = '';
    page -= 1;

    const start = newsPerPage * page;
    const end = start + newsPerPage;
    const paginedData = arrData.slice(start, end);

    renderNews(paginedData);
  }

  function displayPagination(pagesCount) {
    for (let i = 0; i < pagesCount; i += 1) {
      const itemPaginationEl = displayPaginationPage(i + 1);
      listPaginationEl.appendChild(itemPaginationEl);
    }
  }

  function displayPaginationPage(page) {
    const itemPaginationEl = document.createElement('li');
    itemPaginationEl.classList.add('page-pagination__item');
    itemPaginationEl.innerText = page;

    if (currenPage === page) {
      itemPaginationEl.classList.add('page-pagination__item--active');
    }

    handleButtonLeft();
    handleButtonRight();

    itemPaginationEl.addEventListener('click', () => {
      currenPage = page;

      displayList(news, newsPerPage, currenPage);
      smoothScrollUp();

      let currentItemEl = document.querySelector(
        'li.page-pagination__item--active'
      );
      currentItemEl.classList.remove('page-pagination__item--active');

      itemPaginationEl.classList.add('page-pagination__item--active');

      if (currenPage !== 1) {
        btnPrevPg.disabled = false;
      }
      if (currenPage === pagesCount) {
        btnNextPg.disabled = true;
      }

      if (currenPage === 1) {
        btnPrevPg.disabled = true;
      }
      if (currenPage !== pagesCount) {
        btnNextPg.disabled = false;
      }
    });
    return itemPaginationEl;
  }

  pagePaginationEl.addEventListener('click', function (e) {
    handleButton(e.target);
  });

  function handleButton(e) {
    if (e.classList.contains('page-pagination__prev-btn')) {
      currenPage -= 1;
      handleButtonLeft();
      btnNextPg.disabled = false;
    } else if (e.classList.contains('page-pagination__next-btn')) {
      currenPage += 1;
      handleButtonRight();
      btnPrevPg.disabled = false;
    }
    displayList(news, newsPerPage, currenPage);
  }

  function handleButtonLeft() {
    if (currenPage === 1) {
      btnPrevPg.disabled = true;
    } else {
      btnPrevPg.disabled = false;
    }
  }
  function handleButtonRight() {
    if (currenPage === pagesCount) {
      btnNextPg.disabled = true;
    } else {
      btnNextPg.disabled = false;
    }
  }

  displayList(news, newsPerPage, currenPage);
  displayPagination(pagesCount);
});

function smoothScrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
