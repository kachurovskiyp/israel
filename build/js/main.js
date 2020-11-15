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
    window.removeEventListener('keydown', closeModalEsc);
  }

  const closeModalOverlay = (evt) => {
    if(evt.target === modalCall) {
      closeModal();
    }
  }

  const closeModalEsc = (evt) => {
    if(evt.key === "Escape") {
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
      window.removeEventListener('keydown', closeAccept);
    }

    const closeAcceptOverlay = (evt) => {
      if(evt.target === acceptModal) {
        closeAccept();
      }
    }

    window.addEventListener('click', closeAcceptOverlay);
    window.addEventListener('keydown', closeAccept);
    acceptSubmit.addEventListener('click', closeAccept);
  }

  headerFeeback.addEventListener('click', () => {
    modalCall.classList.add('call--open');
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', closeModalOverlay);
    window.addEventListener('keydown', closeModalEsc);
    form.addEventListener('submit', openAccept);
  })

  /* form inside page */

  wantForm.addEventListener('submit', openAccept);
  detailForm.addEventListener('submit', openAccept);

  /* rewiev slider  */

  const slider = document.querySelector('.review__slider');
  const slides = slider.querySelectorAll('.review__slide');
  const reviewSection = document.querySelector('.review');

  const slidesNumberSpan = reviewSection.querySelector('.review__number-slides');
  slidesNumberSpan.innerHTML = slides.length;

  let currentSlide = 0;
  const currentSlideSpan = reviewSection.querySelector('.review__current-slide');
  currentSlideSpan.innerHTML = currentSlide + 1;

  const nextButton = reviewSection.querySelector('.review__next');
  const prewButton = reviewSection.querySelector('.review__prew');

  const changeSlide = (currentSlide) => {
    slides.forEach((slide) => {
      slide.classList.remove('review__slide--active');
    })
    slides[currentSlide].classList.add('review__slide--active');
    currentSlideSpan.innerHTML = currentSlide + 1;
  }

  const getNextSlide = () => {
    if(currentSlide < slides.length - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    changeSlide(currentSlide);
  }

  const getPrewSlide = () => {

    if(currentSlide === 0) {
      currentSlide = slides.length;
    }
    currentSlide--;
    changeSlide(currentSlide);
  }

  nextButton.addEventListener('click', getNextSlide);
  prewButton.addEventListener('click', getPrewSlide);

  /* programs change */

  const programs = document.querySelector('.programs');
  const programsButtonItems = programs.querySelectorAll('.programs__item');
  const programsDescs = programs.querySelectorAll('.programs__description');

  const resetButtons = () => {
    programsButtonItems.forEach((item) => {
      item.classList.remove('programs__item--active');
    });
  }

  const resetDescs = () => {
    programsDescs.forEach((item) => {
      item.classList.remove('programs__description--active');
    })
  }

  const changeDesc = (evt) => {
    const targetClass = `programs__description--${evt.target.value}`;
    const activeClass = 'programs__description--active';
    resetButtons();
    resetDescs();

    evt.target.parentNode.classList.add('programs__item--active');
    programsDescs.forEach((item => {
      if (item.classList.contains(targetClass)) {
        item.classList.add(activeClass);
      }
    }));
  }

  programsButtonItems.forEach((item) => {
    item.querySelector('button').addEventListener('click', changeDesc);
  })

  /* live slider */

  const tabletWidth = 767;
  let liveSlider = undefined;
  const liveSliderContainer = document.querySelector('.swiper-container');

  const activeSlider = () => {
    if(window.innerWidth < tabletWidth) {
      if (!liveSlider) {
        liveSlider = new Swiper(liveSliderContainer);
        liveSliderContainer.querySelector('.swiper-wrapper').classList.remove('swiper-wrapper--block');
        liveSliderContainer.querySelectorAll('.swiper-slide').forEach((item) => {
          item.classList.remove('swiper-slide--width-auto');
        })
      }
    }
    if (window.innerWidth > tabletWidth) {
      if(liveSlider) {
        liveSlider.destroy();
        liveSlider = undefined;
        liveSliderContainer.querySelector('.swiper-wrapper').classList.add('swiper-wrapper--block');
        liveSliderContainer.querySelectorAll('.swiper-slide').forEach((item) => {
          item.classList.add('swiper-slide--width-auto');
        })
      }
    }
  }

  window.addEventListener('resize', activeSlider);
  window.addEventListener('load', activeSlider);

})();

