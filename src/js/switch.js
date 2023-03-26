// switch theme
const refs = {
  switch: document.querySelector('#theme-switch'),
  mobileSwitch: document.querySelector('#mobile__theme-switch'),
  body: document.querySelector('body'),
  switchLightName: document.querySelector('#light-name'),
  switchDarkName: document.querySelector('#dark-name'),
  iconSun: document.querySelector('.switch__icon-sun'),
  iconMoon: document.querySelector('.switch__icon-moon'),
  iconSunMobile: document.querySelector('.mobile-switch__icon-sun'),
  iconMoonMobile: document.querySelector('.mobile-switch__icon-moon'),
  searchInput: document.querySelector('.search__input'),
  burgerMenu: document.querySelector('.burger-menu'),
  switchLabel: document.querySelector('.switch__label'),
  switchAfter: document.querySelector('.switch__label::after'),
  mobileMenu: document.querySelector('.mobil-menu'),
};

let classEl = '';

refs.switch.addEventListener('change', function () {
  if (this.checked) {
    checkedDarkTheme();
  } else {
    checkedLightTheme();
  }
});

refs.mobileSwitch.addEventListener('change', function () {
  if (this.checked) {
    checkedDarkTheme();
  } else {
    checkedLightTheme();
  }
});

function checkedDarkTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
}

function checkedLightTheme() {
  if (!localStorage.getItem('theme') === 'dark') {
    refs.switch.setAttribute('checked', false);
    return;
  } else {
    localStorage.removeItem('theme');
  }
  addDarkClassToHTML();
}

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      refs.switch.setAttribute('checked', true);
      addClass(refs.iconMoon, 'theme-switch');
      addClass(refs.switchDarkName, 'theme-switch');
      addClass(refs.iconMoonMobile, 'theme-switch');
      removeClass(refs.iconSun, 'theme-switch');
      removeClass(refs.iconSunMobile, 'theme-switch');
      removeClass(refs.switchLightName, 'theme-switch');
      addClass(refs.body, 'dark');
      addClass(refs.searchInput, 'dark');
      addClass(refs.burgerMenu, 'dark');
      addClass(refs.mobileMenu, 'dark');
      addClass(refs.switchLabel, 'theme-switch--bg');
      addClass(refs.switchAfter, 'theme-switch--bg');
    } else {
      removeClass(refs.iconMoon, 'theme-switch');
      removeClass(refs.iconMoonMobile, 'theme-switch');
      removeClass(refs.switchDarkName, 'theme-switch');
      addClass(refs.iconSun, 'theme-switch');
      addClass(refs.iconSunMobile, 'theme-switch');
      addClass(refs.switchLightName, 'theme-switch');
      removeClass(refs.body, 'dark');
      removeClass(refs.searchInput, 'dark');
      removeClass(refs.burgerMenu, 'dark');
      removeClass(refs.mobileMenu, 'dark');
      removeClass(refs.switchLabel, 'theme-switch--bg');
      removeClass(refs.switchAfter, 'theme-switch--bg');
    }
  } catch (err) {}
}

function addClass(el, classEl) {
  el.classList.add(classEl);
}

function removeClass(el, classEl) {
  el.classList.remove(classEl);
}

addDarkClassToHTML();
