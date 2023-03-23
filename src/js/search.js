
import { fetchApiSearchQuery } from './news-fetch-service';


// const search = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");

searchInput.addEventListener("input", selectionNews);

function selectionNews(e) {
    e.preventDefault();
    query = e.currentTarget.elements.query.value.trim();
// if (query === '') {
//     return;
//     }
    
    fetchApiSearchQuery(query)
        .then(console.log) 
}