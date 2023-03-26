import { fetchApiPopular } from './news-fetch-service';

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');

let totalPages = 0;
let curPage = 1;
let newsPerPage = 0;
let numLinksTwoSide = 1;

if (window.matchMedia('(max-width: 767px)').matches) {
  newsPerPage = 4;
} else if (window.matchMedia('(min-width: 1280px)').matches) {
  newsPerPage = 8;
} else if (window.matchMedia('(min-width: 768px)').matches) {
  newsPerPage = 7;
}

fetchApiPopular().then(news => {
  totalPages = Math.ceil(news.length / newsPerPage);
  console.log('fetchApiPopular  totalPages:', totalPages);

  pagination(totalPages, curPage, newsPerPage, numLinksTwoSide);

  pg.addEventListener('click', e => {
    const ele = e.target;

    if (ele.dataset.page) {
      const pageNumber = parseInt(e.target.dataset.page, 10);

      curPage = pageNumber;
      pagination(totalPages, curPage, newsPerPage, numLinksTwoSide);
      handleButtonLeft();
      handleButtonRight();
    }
  });
});

// DYNAMIC PAGINATION
function pagination() {
  const range = numLinksTwoSide + 4; // use for handle visible number of links left side

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  const numberTruncateLeft = curPage - numLinksTwoSide;
  const numberTruncateRight = curPage + numLinksTwoSide;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
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
          countTruncate++;
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
    pg.innerHTML = renderTwoSide;
  } else {
    pg.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
}

document
  .querySelector('.page-container')
  .addEventListener('click', function (e) {
    handleButton(e.target);
  });

function handleButton(element) {
  if (element.classList.contains('prev-page')) {
    curPage -= 1;
    handleButtonLeft();
    btnNextPg.disabled = false;
  } else if (element.classList.contains('next-page')) {
    curPage += 1;
    handleButtonRight();
    btnPrevPg.disabled = false;
  }
  pagination();
}
function handleButtonLeft() {
  if (curPage === 1) {
    btnPrevPg.disabled = true;
  } else {
    btnPrevPg.disabled = false;
  }
}
function handleButtonRight() {
  if (curPage === totalPages) {
    console.log(curPage);
    btnNextPg.disabled = true;
  } else {
    btnNextPg.disabled = false;
  }
}
