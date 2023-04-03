export const weatherBlock = document.querySelector('#weather');
// const weatherBtn = document.querySelector('.weather__btn');

const API_KEY = '0a142dd41db52da1a7f6b2fdf16ad4dd';

//Функція запиту на сервер погоди//

export async function loadWeather(lat, lon) {
  showLoading();
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      hideLoading();
      getWeatherData(data);
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    hideLoading();
  }
}

// Функція отримання данних з відповіді від сервера погоди та розмітки цих двнних//

function getWeatherData(data) {
  const weatherIcon = data.weather[0].icon;

  const temperature = Math.round(data.main.temp);
  const weatherDescription = data.weather[0].main;
  const location = data.name;

  const currentDate = data.dt;
  const date = new Date(currentDate * 1000);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${dayOfWeek} <br> ${dayOfMonth} ${month} ${year}`;

  const svgA = new URL('../images/icons.svg', import.meta.url);
  const svgB = 'icon-carbon_location-filled';

  const template = `
  <div class="weather__main">
  <p class="weather__temp">${temperature}&deg;</p>

  <div class="weather__container">
    <p class="weather__desk">${weatherDescription}</p>
    <div class="weather__location">
      <svg class="weather__location-icon" width=18 height=18>
        <use href="${svgA}#${svgB}"></use>
      </svg>
      <p class="weather__location-city">${location}</p>
    </div>
  </div>
  </div>
  <img class="weather__icon" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" />
  <div class="current__date">${formattedDate}</div>
  <button class="weather__btn">Weather for Week</button>`;

  weatherBlock.innerHTML = template;
}

// Перевірка геолокації //

if (weatherBlock) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        await loadWeather(lat, lon);
      },
      () => {
        console.log('Geolocation is not supported by this browser.');
        // за замовчуванням геолокація Нью-Йорк
        const defaultLat = 40.7128;
        const defaultLon = -74.006;
        loadWeather(defaultLat, defaultLon);
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
    // за замовчуванням геолокація Нью-Йорк
    const defaultLat = 40.7128;
    const defaultLon = -74.006;
    loadWeather(defaultLat, defaultLon);
  }
}

const loading = document.getElementById('loading');

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}

// // Обработчик клика на кнопку "Weather for Week"
// weatherBtn.addEventListener('click', onWeatherBtnClick);

// export async function onWeatherBtnClick(event) {
//   // cleanWeatherBlock();
//   if (event.target.classList.contains('weather__btn')) {
//     // showLoading();
//     try {
//       const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${API_KEY}`;
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       // console.log(data);
//       if (response.ok) {
//         // hideLoading();
//         showWeatherTable(data.daily);
//       } else {
//         console.log(error);
//       }
//     } catch (error) {
//       console.log(error);
//       // hideLoading();
//     }
//   }
// }

// // Функция отображения таблицы с прогнозом на неделю
// function showWeatherTable(dailyData) {
//   const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const tableRows = dailyData
//     .map(day => {
//       const date = new Date(day.dt * 1000);
//       const dayOfWeek = daysOfWeek[date.getDay()];
//       const dayOfMonth = date.getDate();
//       const months = [
//         'Jan',
//         'Feb',
//         'Mar',
//         'Apr',
//         'May',
//         'June',
//         'July',
//         'Aug',
//         'Sep',
//         'Oct',
//         'Nov',
//         'Dec',
//       ];

//       const month = months[date.getMonth()];
//       const year = date.getFullYear();
//       const formattedDate = `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
//       const weatherIcon = day.weather[0].icon;
//       const weatherDescription = day.weather[0].main;
//       const minTemp = Math.round(day.temp.min);
//       const maxTemp = Math.round(day.temp.max);
//       return `
//       <tr>
//         <td>${formattedDate}</td>
//         <td><img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}" /></td>
//         <td>${minTemp}&deg;</td>
//         <td>${maxTemp}&deg;</td>
//       </tr>
//     `;
//     })
//     .join('');

//   const table = `
//     <table>
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Weather</th>
//           <th>Min Temp</th>
//           <th>Max Temp</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${tableRows}
//       </tbody>
//     </table>
//   `;

//   weatherBlock.innerHTML = table;
// }

// function cleanWeatherBlock() {
//   weatherBlock.innerHTML = '';
// }
