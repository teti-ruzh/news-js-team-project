const newsList = document.querySelector('.news__list');
let renderData = [];
populateFavorite();
newsList.addEventListener('click', onAddButtonClick);

function onAddButtonClick(event) {
  const btnFavoriteElement = event.target.closest('.news__favorite-button');
  if (btnFavoriteElement) {
    const newsItem = btnFavoriteElement.closest('.news__item');

    const title = newsItem.querySelector('.news__title').textContent;
    const section = newsItem.querySelector('.news__category-text').textContent;
    const foto = newsItem.querySelector('.news__foto').getAttribute('src');
    const newsAbstruct = newsItem.querySelector('.news__abstruct').textContent;
    const newDataFormat = newsItem.querySelector('.news__data').textContent;
    const url = newsItem.querySelector('.news__link').getAttribute('href');

    const newsObject = {
      title,
      section,
      foto,
      newsAbstruct,
      newDataFormat,
      url,
    };
    renderData.push(newsObject);

    localStorage.setItem('favorite', JSON.stringify(renderData));
    
    const overlayElement = newsItem.querySelector('.news-box-content');
    const favoriteButton = newsItem.querySelector('.news__favorite-button');
    overlayElement.textContent = favoriteButton.classList.contains(
      'news__favorite-button--active'
    )
      ? 'Add to favorite'
      : 'Remove from favorite';
    favoriteButton.classList.toggle('news__favorite-button--active');
  }
}

// Збереження локал сторедж при оновленні сторінки
function populateFavorite() {
  const savedFavData = JSON.parse(localStorage.getItem('favorite'));
  if (!savedFavData) {
    renderData = [];
  } else {
    renderData = JSON.parse(localStorage.getItem('favorite'));
  }
};
