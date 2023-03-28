import Notiflix from 'notiflix';

const daysTag = document.querySelector('.days');
const currentDate = document.querySelector('.current-date');
const prevNextIcon = document.querySelectorAll('.calendar-icons span');

const calendarIcon = document.querySelector('#menu-calendar .categories__icon');

const btnEl = document.querySelector('.calendar__btn');
const spanEl = document.querySelector('.calendar-btn-span');
const modalEl = document.querySelector('.modal');
// const todayBtn = document.querySelector('.today-btn');

const yearBtnPrev = document.querySelector('.prev-year');
const yearBtnNext = document.querySelector('.next-year');
// const yearsDiv = document.querySelector('.years ul');

btnEl.addEventListener('click', () => {
  if (btnEl.classList.contains('btn-is-active')) {
    btnEl.classList.remove('btn-is-active');
    return;
  } else {
    modalEl.classList.add('is-shown');
    btnEl.classList.add('btn-is-active');
    calendarIcon.classList.add('rotate');
  }
});
btnEl.addEventListener('click', () => {
  if (btnEl.classList.contains('btn-is-active')) {
    return;
  } else {
    modalEl.classList.remove('is-shown');
    btnEl.classList.remove('btn-is-active');
    calendarIcon.classList.remove('rotate');
  }
});
window.addEventListener('click', hideModals);
function hideModals(evt) {
  if (evt.target.closest('.calendar')) {
    return;
  }
  if (modalEl.classList.contains('is-shown')) {
    modalEl.classList.remove('is-shown');
    btnEl.classList.remove('btn-is-active');
    calendarIcon.classList.remove('rotate');
  }
}

let selectedDate = '';
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function renderCalendar() {
  let firstDayofMonth = new Date(currYear, currMonth, 0).getDay();
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = '';

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li><button type="button" class="button inactive" id="inactive" disabled>${
      lastDateofLastMonth - i + 1
    }</button></li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    date = new Date();
    let isToday =
      i === date.getDate() &&
      currMonth === date.getMonth() &&
      currYear === date.getFullYear()
        ? 'current-month-day'
        : '';
    liTag += `<li><button type="button" class="button ${isToday}">${i}</button></li>`;
  }

  for (let i = lastDayofMonth; i < 7; i++) {
    liTag += `<li><button type="button" class="button inactive" id="inactive" disabled>${
      i - lastDayofMonth + 1
    }</button></li>`;
  }

  currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  const dayBtns = document.querySelectorAll('.button');
  renderBtns(dayBtns);

  daysTag.addEventListener('click', onDaysTagClick);
}

function onDaysTagClick(e) {
  const currentActiveDate = document.querySelector('.active');

  if (currentActiveDate) {
    currentActiveDate.classList.remove('active');
    calendarIcon.classList.remove('rotate');
  }

  selectedDate = `${currYear}/${addLeadingZero(currMonth + 1)}/${addLeadingZero(
    e.target.textContent
  )}`;
  let selectedTime = Number(new Date(selectedDate).getTime());
  //   let currentNowDate = `${new Date().getFullYear()}/${addLeadingZero(new Date().getMonth() + 1)}/${addLeadingZero(new Date().getDate())}`;
  let currentNowDate = `${new Date().getFullYear()}/${addLeadingZero(
    new Date().getMonth() + 1
  )}/${addLeadingZero(new Date().getDate())}`;
  let currentNowTime = Number(new Date(currentNowDate).getTime());

  if (selectedTime <= currentNowTime) {
    localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
  }
  if (selectedTime > currentNowTime) {
    Notiflix.Notify.failure(
      'We apologize, but the selected date cannot be from the future. Try selecting again!',
      {
        opacity: 1,
        position: 'center-top',
        timeout: 450,
        cssAnimationDuration: 3000,
        cssAnimationStyle: 'from-top',
      }
    );
    spanEl.textContent = currentNowDate;
    date = new Date();
    currYear = date.getFullYear();
    currMonth = date.getMonth();
    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
    renderCalendar();
    return;
  }

  if (selectedTime <= currentNowTime) {
    e.target.classList.add('active');
  }

  calendarIcon.classList.remove('rotate');
}

function renderBtns(dayBtns) {
  dayBtns.forEach(dayBtn =>
    dayBtn.addEventListener('click', e => {
      spanEl.textContent = `${addLeadingZero(
        e.target.textContent
      )}/${addLeadingZero(currMonth + 1)}/${currYear}`;
      modalEl.classList.toggle('is-shown');
      btnEl.classList.remove('btn-is-active');
    })
  );
}

renderCalendar();

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onPrevNextIconClick() {
  prevNextIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });
}
onPrevNextIconClick();

function onYearBtnPrevClick() {
  yearBtnPrev.addEventListener('click', () => {
    currYear -= 1;
    renderCalendar();
  });
}
onYearBtnPrevClick();

function onYearBtnNextClick() {
  yearBtnNext.addEventListener('click', () => {
    currYear += 1;
    renderCalendar();
  });
}
onYearBtnNextClick();
