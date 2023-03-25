const weatherBlock = document.querySelector('#weather');

const API_KEY = '0a142dd41db52da1a7f6b2fdf16ad4dd';

async function loadWeather() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          getWeatherData(data);
        } else {
          console.log(error);
        }
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  } catch (error) {
    console.log(error);
  }
}

function getWeatherData(data) {
  const weatherIcon = data.weather[0].icon;

  const temperature = Math.round(data.main.temp);
  const weatherDescription = data.weather[0].main;
  const location = data.name;
  const currentDate = data.dt;
  const formattedDate = new Date(currentDate * 1000).toDateString();

  console.log(data);
  const template = `
  <div class="weather__main">
  <p class="weather__temp">${temperature}&deg;</p>

  <div class="weather__container">
    <p class="weather__desk">${weatherDescription}</p>
    <div class="weather__location">
      <svg class="weather__location-icon" src="././images/icons.svg#icon-carbon_location-filled" width=18 height=18></svg>
      <p class="weather__location-city">${location}</p>
    </div>
  </div>
  </div>
  <img class="weather__icon" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" />
  <div class="current__date">${formattedDate}</div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
