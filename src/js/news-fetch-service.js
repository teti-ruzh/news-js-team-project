// Creating fetch from API

// query змінна, значення якої нам прийде з пошуку у хедері
let query = '';

const API_KEY = 'api-key=nb4kIc3A28NYQPkulI6xtxUAkPze1R9u';

const MOST_POPULAR_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${API_KEY}`;
const CATEGORY_URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?${API_KEY}`;
const SEARCH_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&${API_KEY}`;

export async function fetchApiPopular() {
  try {
    const response = await fetch(MOST_POPULAR_URL);
    if (response.ok) {
      const data = await response.json().then(response => {
        return response.results;
      });
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchApiCategory() {
  try {
    const response = await fetch(CATEGORY_URL);
    const data = await response.json();
    const categories = data.results;
    return categories;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchApiSearchQuery() {
  try {
    const response = await fetch(SEARCH_URL);
    if (response.ok) {
      const data = await response.json().then(response => {
        return response.results;
      });
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
