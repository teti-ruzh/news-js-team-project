const API_KEY = 'api-key=nb4kIc3A28NYQPkulI6xtxUAkPze1R9u';
const MOST_POPULAR_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?${API_KEY}`;

const btn = document.querySelector('#btn-1');
btn.addEventListener('click', fetchApi);

function foo() {
  console.log('hello');
}
foo();

async function fetchApi() {
  await fetch(MOST_POPULAR_URL).then(response => {
    if (response.ok) {
      console.log(response.json());
      return response.json();
    }
  });
}
