
import { fetchApiSearchQuery } from './news-fetch-service';


// const search = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");

searchInput.addEventListener("submit", selectionNews);

 async function selectionNews(e) {
    e.preventDefault();
    query = e.currentTarget.elements.query.value.trim();
if (query === '') {
    return;
    }
    
   await fetchApiSearchQuery(query)
        .then((result => {
        if (result.length === 0) {
            alert('Sorry, there are no images matching your search query. Please try again.')
        }
    }).catch(() => {
      alert('Oops, there is no country with that name');
    })) 
}