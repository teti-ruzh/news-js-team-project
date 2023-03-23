// current page
const headerItemEls = document.querySelectorAll('.header__item');
console.log(headerItemEls);
const currentUrl = window.location.href;
console.log(currentUrl);

headerItemEls.forEach(page => {
  let currentPage = page.href;
  if (currentPage === currentUrl) {
    page.classList.add('current-page');
  }
  return;
});
