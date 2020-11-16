'use strict';

(function () {
  var headerFeeback = document.querySelector('.header__feedback');
  var modalCall = document.querySelector('.call');
  var form = document.querySelector('.call__form');
  var acceptModal = document.querySelector('.accepted');
  var modalClose = document.querySelector('.call__close');

  var closeModal = function closeModal() {
    modalCall.classList.remove('call--open');
    modalClose.removeEventListener('click', closeModal);
    window.removeEventListener('click', closeModalOverlay);
    window.removeEventListener('keydown', closeModalEsc);
  };

  var closeModalOverlay = function closeModalOverlay(evt) {
    if (evt.target === modalCall) {
      closeModal();
    }
  };

  var closeModalEsc = function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      closeModal();
    }
  };

  var openAccept = function openAccept(evt) {
    evt.preventDefault();
    closeModal();
    acceptModal.classList.add('accepted--open');
    var acceptSubmit = acceptModal.querySelector('.modal__submit');

    var closeAccept = function closeAccept() {
      acceptModal.classList.remove('accepted--open');
      acceptSubmit.removeEventListener('click', closeAccept);
      window.removeEventListener('click', closeAcceptOverlay);
      window.removeEventListener('keydown', closeAccept);
    };

    var closeAcceptOverlay = function closeAcceptOverlay(evt) {
      if (evt.target === acceptModal) {
        closeAccept();
      }
    };

    window.addEventListener('click', closeAcceptOverlay);
    window.addEventListener('keydown', closeAccept);
    acceptSubmit.addEventListener('click', closeAccept);
  };

  headerFeeback.addEventListener('click', function () {
    modalCall.classList.add('call--open');
    modalClose.addEventListener('click', closeModal);
    window.addEventListener('click', closeModalOverlay);
    window.addEventListener('keydown', closeModalEsc);
    form.addEventListener('submit', openAccept);
  });
  /* form inside page */

  if (document.querySelector('.want__form')) {
    var wantForm = document.querySelector('.want__form');
    wantForm.addEventListener('submit', openAccept);
  }

  if (document.querySelector('.detail__feedback')) {
    var detailForm = document.querySelector('.detail__feedback');
    detailForm.addEventListener('submit', openAccept);
  }
  /* rewiev slider  */


  if (document.querySelector('.review__slider')) {
    var slider = document.querySelector('.review__slider');
    var slides = slider.querySelectorAll('.review__slide');
    var reviewSection = document.querySelector('.review');
    var slidesNumberSpan = reviewSection.querySelector('.review__number-slides');
    slidesNumberSpan.innerHTML = slides.length;
    var currentSlide = 0;
    var currentSlideSpan = reviewSection.querySelector('.review__current-slide');
    currentSlideSpan.innerHTML = currentSlide + 1;
    var nextButton = reviewSection.querySelector('.review__next');
    var prewButton = reviewSection.querySelector('.review__prew');

    var changeSlide = function changeSlide(currentSlide) {
      slides.forEach(function (slide) {
        slide.classList.remove('review__slide--active');
      });
      slides[currentSlide].classList.add('review__slide--active');
      currentSlideSpan.innerHTML = currentSlide + 1;
    };

    var getNextSlide = function getNextSlide() {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
      } else {
        currentSlide = 0;
      }

      changeSlide(currentSlide);
    };

    var getPrewSlide = function getPrewSlide() {
      if (currentSlide === 0) {
        currentSlide = slides.length;
      }

      currentSlide--;
      changeSlide(currentSlide);
    };

    nextButton.addEventListener('click', getNextSlide);
    prewButton.addEventListener('click', getPrewSlide);
  }
  /* programs change */


  if (document.querySelector('.programs')) {
    var programs = document.querySelector('.programs');
    var programsButtonItems = programs.querySelectorAll('.programs__item');
    var programsDescs = programs.querySelectorAll('.programs__description');

    var resetButtons = function resetButtons() {
      programsButtonItems.forEach(function (item) {
        item.classList.remove('programs__item--active');
      });
    };

    var resetDescs = function resetDescs() {
      programsDescs.forEach(function (item) {
        item.classList.remove('programs__description--active');
      });
    };

    var changeDesc = function changeDesc(evt) {
      var targetClass = "programs__description--".concat(evt.target.value);
      var activeClass = 'programs__description--active';
      resetButtons();
      resetDescs();
      evt.target.parentNode.classList.add('programs__item--active');
      programsDescs.forEach(function (item) {
        if (item.classList.contains(targetClass)) {
          item.classList.add(activeClass);
        }
      });
    };

    programsButtonItems.forEach(function (item) {
      item.querySelector('button').addEventListener('click', changeDesc);
    });
  }
  /* live slider */


  if (document.querySelector('.swiper-container')) {
    var tabletWidth = 767;
    var liveSlider = undefined;
    var liveSliderContainer = document.querySelector('.swiper-container');

    var activeSlider = function activeSlider() {
      if (window.innerWidth < tabletWidth) {
        if (!liveSlider) {
          liveSlider = new Swiper(liveSliderContainer);
          liveSliderContainer.querySelector('.swiper-wrapper').classList.remove('swiper-wrapper--block');
          liveSliderContainer.querySelectorAll('.swiper-slide').forEach(function (item) {
            item.classList.remove('swiper-slide--width-auto');
          });
        }
      }

      if (window.innerWidth > tabletWidth) {
        if (liveSlider) {
          liveSlider.destroy();
          liveSlider = undefined;
          liveSliderContainer.querySelector('.swiper-wrapper').classList.add('swiper-wrapper--block');
          liveSliderContainer.querySelectorAll('.swiper-slide').forEach(function (item) {
            item.classList.add('swiper-slide--width-auto');
          });
        }
      }
    };

    window.addEventListener('resize', activeSlider);
    window.addEventListener('load', activeSlider);
  }
})();