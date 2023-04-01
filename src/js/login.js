(() => {
  const refs = {
    openLoginModalBtn: document.querySelector('[data-login-open]'),
    closeLoginModalBtn: document.querySelector('[data-login-close]'),
    modal: document.querySelector('[login-data-modal]'),
  };

  refs.openLoginModalBtn.addEventListener('click', toggleLoginModal);
  refs.closeLoginModalBtn.addEventListener('click', toggleLoginModal);

  function toggleLoginModal() {
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.toggle('login-modal-open');
  }
})();
