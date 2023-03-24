import $ from 'jquery';

$(document).ready(function () {
  $('a').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

const scrollBtn = document.querySelector('.up-button');
window.onscroll = () => {
  window.scrollY <= 50
    ? scrollBtn.classList.add('is-hidden')
    : scrollBtn.classList.remove('is-hidden');
};
