import { fetchMostpopularData, renderNews } from './news-gallery';

const newsList = document.querySelector('.news__list');
const listPaginationEl = document.querySelector('.page-pagination__list');
const btnPrevPg = document.querySelector('button.page-pagination__prev-btn');
const btnNextPg = document.querySelector('button.page-pagination__next-btn');
const pagePaginationEl = document.querySelector('.page-pagination');

let newsPerPage = 0;

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 0,
};

// пагінація по популярних новинах
fetchMostpopularData().then(news => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    newsPerPage = 4;
  } else if (window.matchMedia('(min-width: 1280px)').matches) {
    newsPerPage = 8;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    newsPerPage = 7;
  }

  valuePage.totalPages = Math.ceil(news.length / newsPerPage);

  if (valuePage.totalPages === 0) {
    pagePaginationEl.classList.add('hidden');
  }

  function displayList(arrData, newsPerPage, page) {
    newsList.innerHTML = '';
    page -= 1;

    const start = newsPerPage * page;
    const end = start + newsPerPage;
    const paginedData = arrData.slice(start, end);

    renderNews(paginedData);
    pagination();
  }

  listPaginationEl.addEventListener('click', e => {
    const ele = e.target;

    if (ele.dataset.page) {
      const pageNumber = parseInt(e.target.dataset.page, 10);

      valuePage.curPage = pageNumber;
      pagination(valuePage);
      handleButtonLeft();
      handleButtonRight();
      smoothScrollUp();
      displayList(news, newsPerPage, valuePage.curPage);
    }
  });

  // DYNAMIC PAGINATION
  function pagination() {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

    let range = 0;
    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="page-pagination__dots">...</li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side
    let active = '';

    if (window.matchMedia('(max-width: 767px)').matches) {
      range = delta + 1; // use for handle visible number of links left side

      // use for truncate two side
      const numberTruncateLeft = curPage - delta;
      const numberTruncateRight = curPage + delta;

      for (let pos = 1; pos <= totalPages; pos++) {
        active = pos === curPage ? 'active' : '';

        // truncate
        if (totalPages >= 1 * range - 1) {
          if (
            numberTruncateLeft > 0 &&
            numberTruncateRight < totalPages - 1 + 1
          ) {
            // truncate 2 side
            if (pos > numberTruncateLeft && pos < numberTruncateRight) {
              renderTwoSide += renderPage(pos, active);
            }
          } else {
            // truncate left side or right side
            if (
              (curPage < range && pos <= range) ||
              (curPage > totalPages - range && pos >= totalPages - range + 1) ||
              pos === totalPages ||
              pos === 1
            ) {
              render += renderPage(pos, active);
            } else {
              countTruncate += 1;
              if (countTruncate === 1) render += dot;
            }
          }
        }
      }

      if (renderTwoSide) {
        renderTwoSide =
          renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
        listPaginationEl.innerHTML = renderTwoSide;
      } else {
        listPaginationEl.innerHTML = render;
      }
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      range = delta + 4; // use for handle visible number of links left side

      // use for truncate two side
      const numberTruncateLeft = curPage - delta;
      const numberTruncateRight = curPage + delta;

      for (let pos = 1; pos <= totalPages; pos++) {
        active = pos === curPage ? 'active' : '';

        // truncate
        if (totalPages >= 2 * range - 1) {
          if (
            numberTruncateLeft > 3 &&
            numberTruncateRight < totalPages - 3 + 1
          ) {
            // truncate 2 side
            if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
              renderTwoSide += renderPage(pos, active);
            }
          } else {
            // truncate left side or right side
            if (
              (curPage < range && pos <= range) ||
              (curPage > totalPages - range && pos >= totalPages - range + 1) ||
              pos === totalPages ||
              pos === 1
            ) {
              render += renderPage(pos, active);
            } else {
              countTruncate += 1;
              if (countTruncate === 1) render += dot;
            }
          }
        } else {
          // not truncate
          render += renderPage(pos, active);
        }
      }

      if (renderTwoSide) {
        renderTwoSide =
          renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
        listPaginationEl.innerHTML = renderTwoSide;
      } else {
        listPaginationEl.innerHTML = render;
      }
    }
  }

  function renderPage(index, active = '') {
    return ` <li class="page-pagination__item ${active}" data-page="${index}">${index}</li>`;
  }

  pagePaginationEl.addEventListener('click', function (e) {
    handleButton(e.target);
  });

  function handleButton(e) {
    if (e.classList.contains('page-pagination__prev-btn')) {
      valuePage.curPage -= 1;
      handleButtonLeft();
      btnNextPg.disabled = false;
    } else if (e.classList.contains('page-pagination__next-btn')) {
      valuePage.curPage += 1;
      handleButtonRight();
      btnPrevPg.disabled = false;
    }

    smoothScrollUp();
    displayList(news, newsPerPage, valuePage.curPage);
  }

  function handleButtonLeft() {
    if (valuePage.curPage === 1) {
      btnPrevPg.disabled = true;
    } else {
      btnPrevPg.disabled = false;
    }
  }

  function handleButtonRight() {
    if (valuePage.curPage === valuePage.totalPages) {
      btnNextPg.disabled = true;
    } else {
      btnNextPg.disabled = false;
    }
  }

  displayList(news, newsPerPage, valuePage.curPage);
});

function smoothScrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
