'use strict';

(function () {
  const headerFeeback = document.querySelector('.header__feedback');
  const modalCall = document.querySelector('.call');
  const form = document.querySelector('.call__form');
  const acceptModal = document.querySelector('.accepted');
  const modalClose = document.querySelector('.call__close');

  const wantForm = document.querySelector('.want__form');
  const detailForm = document.querySelector('.detail__feedback');

  const closeModal = () => {
    modalCall.classList.remove('call--open');
    modalClose.removeEventListener('click', closeModal);
    window.removeEventListener('click', closeModalOverlay);
  }

  const closeModalOverlay = (evt) => {
    if(evt.target === modalCall) {
      closeModal();
    }
  }

  const openAccept = (evt) => {
    evt.preventDefault();

    closeModal();
    acceptModal.classList.add('accepted--open');

    const acceptSubmit = acceptModal.querySelector('.modal__submit');

    const closeAccept = () => {
      acceptModal.classList.remove('accepted--open');
      acceptSubmit.removeEventListener('click', closeAccept);
      window.removeEventListener('click', closeAcceptOverlay);
    }

    const closeAcceptOverlay = (evt) => {
      if(evt.target === acceptModal) {
        closeAccept();
      }
    }

    window.addEventListener('click', closeAcceptOverlay);
    acceptSubmit.addEventListener('click', closeAccept);
  }

  headerFeeback.addEventListener('click', () => {
    modalCall.classList.add('call--open');
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', closeModalOverlay);
    form.addEventListener('submit', openAccept);
  })

  /* form inside page */

  wantForm.addEventListener('submit', openAccept);
  detailForm.addEventListener('submit', openAccept);

  /* slider  */
  const tabletWidth = 767;

  if(window.innerWidth < tabletWidth) {
    const gallery = document.querySelector('.gallery');

    const slides = gallery.querySelectorAll('li');

    slides.forEach( (slide) => {
      slide.classList.add('live__gallery-item--disable');
    });

    slides[0].classList.remove('live__gallery-item--disable');

  }
})();

