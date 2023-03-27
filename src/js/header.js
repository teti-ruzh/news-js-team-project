// current page
const headerItemEls = document.querySelectorAll('.header__item');
const currentUrl = window.location.href;

headerItemEls.forEach(page => {
  let currentPage = page.href;
  if (currentPage === currentUrl) {
    page.classList.add('current-page');
  }
  return;
});

// інпут пошуку на мобільній версії
const searchInputEl = document.querySelector('.search__input');
const searchBtnSubmit = document.querySelector('.search__btn');
const searchBtnSvg = document.querySelector('.btn-search');
const screenWidth = window.screen.width;

searchBtnSvg.addEventListener('click', inputHiddenOnMobile);

function inputHiddenOnMobile() {
  if (screenWidth < 450) {
    searchBtnSubmit.classList.add('search-hidden');
    searchInputEl.classList.add('search-hidden');
    searchBtnSvg.classList.add('disabled');
    setTimeout(() => {
      if (searchInputEl.value === '') {
        searchBtnSubmit.classList.remove('search-hidden');
        searchInputEl.classList.remove('search-hidden');
        searchBtnSvg.classList.remove('disabled');
      }
    }, 7000);
  }
  return;
}
