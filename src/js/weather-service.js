const API_KEY = '0a142dd41db52da1a7f6b2fdf16ad4dd';

async function getWeatherData() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;

        const iconResponse = await fetch(iconUrl);

        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;

        console.log(data);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  } catch (error) {
    console.log(error);
  }
}

getWeatherData();
