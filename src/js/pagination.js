import { weatherBlock } from './weather-service';

const newsList = document.querySelector('.news__list');
const errorImage = document.querySelector('.errorImage');
const pagePaginationEl = document.querySelector('.page-pagination');
const listPaginationEl = document.querySelector('.page-pagination__list');
const btnPrevPg = document.querySelector('button.page-pagination__prev-btn');
const btnNextPg = document.querySelector('button.page-pagination__next-btn');

let newsPerPage = 0;

export function createPagination(arrNews, renderNewsCards) {
  if (window.matchMedia('(max-width: 767px)').matches) {
    newsPerPage = 4;
  } else if (window.matchMedia('(min-width: 1280px)').matches) {
    newsPerPage = 8;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    newsPerPage = 7;
  }

  const dataPage = {
    curPage: 1,
    numLinksTwoSide: 1,
    totalPages: Math.ceil(arrNews.length / newsPerPage),
    arrNews,
    newsPerPage,
    renderNewsCards,
  };

  listNewsCards(dataPage);

  errorImage.classList.add('visually-hidden');
  pagePaginationEl.classList.remove('hidden');
  weatherBlock.classList.remove('hidden');
  

  if (dataPage.totalPages === 0) {
    errorImage.classList.remove('visually-hidden');
    pagePaginationEl.classList.add('hidden');
    weatherBlock.classList.add('hidden');
    return;
  }

  if (dataPage.totalPages <= 1) {
    pagePaginationEl.classList.add('hidden');
    return;
  }

  listPaginationEl.addEventListener('click', function (e) {
    const el = e.target;
    if (el.dataset.page) {
      const pageNumber = parseInt(e.target.dataset.page, 10);

      dataPage.curPage = pageNumber;
      pagination(dataPage);
      onBtnLeftClick(dataPage);
      onBtnRightClick(dataPage);
    }
  });

  pagePaginationEl.addEventListener('click', function (e) {
    onBtnClick(e.target, dataPage);
    if (e.target.nodeName === 'LI' || e.target.nodeName === 'BUTTON') {
      listNewsCards(dataPage);
      smoothScrollUp();
    }
  });
}

// DYNAMIC PAGINATION
function pagination(dataPage) {
  const { totalPages, curPage, numLinksTwoSide: delta } = dataPage;

  let range = 0;
  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="page-pagination__dots">...</li>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side
  let active = '';

  // use for truncate two side
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;

  if (window.matchMedia('(max-width: 767px)').matches) {
    range = delta + 1; // use for handle visible number of links left side
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === curPage ? 'active' : '';

      // truncate
      if (totalPages >= 2 * range - 1) {
        if (numberTruncateLeft > 0 && numberTruncateRight < totalPages) {
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
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    range = delta + 4; // use for handle visible number of links left side
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
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    listPaginationEl.innerHTML = renderTwoSide;
  } else {
    listPaginationEl.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` <li class="page-pagination__item ${active}" data-page="${index}">${index}</li>`;
}

function onBtnClick(element, dataPage) {
  if (element.classList.contains('page-pagination__prev-btn')) {
    dataPage.curPage -= 1;
    onBtnLeftClick(dataPage);
    btnNextPg.disabled = false;
  } else if (element.classList.contains('page-pagination__next-btn')) {
    dataPage.curPage += 1;
    onBtnRightClick(dataPage);
    btnPrevPg.disabled = false;
  }
}

function onBtnLeftClick(dataPage) {
  if (dataPage.curPage === 1) {
    btnPrevPg.disabled = true;
  } else {
    btnPrevPg.disabled = false;
  }
}

function onBtnRightClick(dataPage) {
  if (dataPage.curPage === dataPage.totalPages) {
    btnNextPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
  }
}

function listNewsCards(dataPage) {
  const { curPage, arrNews, newsPerPage, renderNewsCards } = dataPage;
  newsList.innerHTML = '';

  if (curPage === 1) {
    const start = (curPage - 1) * newsPerPage;
    const end = start + newsPerPage;
    const paginedData = arrNews.slice(start, end);
    renderNewsCards(paginedData);
    addWeatherWidget()
    pagination(dataPage);
  } else {
    const start = (curPage - 1) * (newsPerPage + 1) - 1;
    const end = start + (newsPerPage + 1);
    const paginedData = arrNews.slice(start, end);
    renderNewsCards(paginedData);
    pagination(dataPage);
  }
}

function smoothScrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Позиціонування віджету погоди Олексія
function addWeatherWidget() {
  const viewportWidth = window.innerWidth;
  let index = 0;
  if (viewportWidth < 768) {
    index = 0;
  } else if (viewportWidth >= 768 && viewportWidth < 1280) {
    index = 1;
  } else {
    index = 2;
  }
  newsList.insertBefore(weatherBlock, newsList.children[index]);
  }

weatherBlock.classList.add('hidden');