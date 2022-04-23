//easier  Method in HTML and CSS
/* const clickScroll = document.querySelector('.click_scroll');
const sectionNews = document.querySelector('#section__news');

const clickScrollToGallery = document.querySelector('.click_scroll_ToGallery');
const sectionGallery = document.querySelector('#section__gallery');

clickScroll.addEventListener('click', function (e) {
  const s1coords = sectionNews.getBoundingClientRect();

  // Old school method. It is necessary also to create an object with X and Y scrolling to implement smooth scrolling
  //   window.scrollTo({
  //     left: s1coords.left + window.scrollX,
  //     top: s1coords.top + window.scrollY,
  //     behavior: 'smooth',
  //   });

  sectionNews.scrollIntoView({ behavior: 'smooth' });
  //newer way, but only supported by newer browsers.
});

clickScrollToGallery.addEventListener('click', function (e) {
  const s2coords = sectionGallery.getBoundingClientRect();
  sectionGallery.scrollIntoView({ behavior: 'smooth' });
}); */

/* const h1 = document.querySelector('h1');
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(2)';
}); */

//-----------------------   -------------------------//

//Navi Highlight (mouseover - mouseout (it bubbles) // mouseenter - mouseleave (does not bubble))
//Fade Animation
// Using closures to simplify the appication recommended by Siddharth

const hoverFade = function (opacity) {
  return function (e) {
    if (e.target.classList.contains('navi__a')) {
      const link = e.target;
      const siblings = link.closest('.navi__nav').querySelectorAll('.navi__a');
      const logo = link.closest('.navi__nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
    }
  };
};

const nav = document.querySelector('.navi__nav');
nav.addEventListener('mouseover', hoverFade(0.5));
nav.addEventListener('mouseout', hoverFade(1));

// const hoverFade = function (e) {
//   if (e.target.classList.contains('navi__a')) {
//     const link = e.target;
//     const siblings = link.closest('.navi__nav').querySelectorAll('.navi__a');
//     const logo = link.closest('.navi__nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = this; // this = e.currenTarget by default
//     });
//     logo.style.opacity = this;
//   }
// };
// const nav = document.querySelector('.navi__nav');

// // Passing "argument" into handler. Event Handler FUNCTIONS can only can one real argument,
// nav.addEventListener('mouseover', hoverFade.bind(0.5)); // bind  returns a new function
// nav.addEventListener('mouseout', hoverFade.bind(1));

//-----------------------   -------------------------//

//-----------------------   -------------------------//
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

const imgHQ = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);
    if (!entry.isIntersecting) return;

    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgHQ.forEach(img => imgObserver.observe(img));

//  ------------------  Slider

// const slider = document.querySelector('.section__news_carousel');
// slider.style.overflow = 'visible';

const sliderFunction = function () {
  const slides = document.querySelectorAll('.section__news_carousel_slide');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (i) {
    document
      .querySelectorAll('.dots-dot')
      .forEach(dot => dot.classList.remove('dots-dot--active'));
    document
      .querySelector(`.dots-dot[data-slide="${i}"]`)
      .classList.add('dots-dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const slideForward = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const slideBackward = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  btnRight.addEventListener('click', slideForward);
  btnLeft.addEventListener('click', slideBackward);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') slideBackward();
    e.key === 'ArrowRight' && slideForward();
  });

  // ----------- Dots functions
  const initializeSliderDots = function () {
    goToSlide(0); //Slide Reset
    createDots(0);
    activateDot(0);
  };
  initializeSliderDots();

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      console.log('dot');
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;
      // currentSlide = +e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliderFunction();
