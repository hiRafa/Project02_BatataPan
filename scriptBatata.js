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
      const target = e.target;
      const siblings = target
        .closest('.navi__nav')
        .querySelectorAll('.navi__a');
      const logo = target.closest('.navi__nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== target) el.style.opacity = opacity;
        logo.style.opacity = opacity;
      });
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

//----------------------- Section Observer   -------------------------//
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return; // when a section it not showing, this function returns here.
  entry.target.classList.remove('section-hidden'); // when a new section is showing, this function applies removes the section hidden class
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
//function to observe the whole page and all sections and implement the revealSection function.

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});
//this allows to add section hidden to all sections automatically when the page is loaded, without the need to add manually on the HTML
//
//
//

//----------------------- Lazy Load Image  -------------------------//
const imgHQ = document.querySelectorAll('img[data-src]'); // [data-src] is for the original HQ img. (src was used for LQ version)
const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src; // Replace src with data-src
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img'); // lazy-img class has blur effect
    });
    observer.unobserve(entry.target); //unobserve to stop any possible effect and consume less memory I think
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, // the container, the body, anything
  threshold: 0,
  rootMargin: '-100px',
});

imgHQ.forEach(img => imgObserver.observe(img));

//-----------------------  Slider  -------------------------//

// const slider = document.querySelector('.section__news_carousel');
// slider.style.overflow = 'visible';

const sliderFunction = function () {
  const allSlides = document.querySelectorAll('.carousel_slide');
  let currentSlide = 0;
  const maxSlide = allSlides.length;

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // DOTs -------
  const createDots = function () {
    allSlides.forEach(function (_, i) {
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

  // Slides -------
  const goToSlide = function (slide) {
    allSlides.forEach(
      (eachSlide, i) =>
        (eachSlide.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const slideForward = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0; // to avoid slide forward to infinity and loop back to the first slide
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide); // applying translateX
    activateDot(currentSlide);
  };

  const slideBackward = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1; // to avoid slide backward to infinity and loop back to the last slide
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide); // applying translateX
    activateDot(currentSlide);
  };

  btnRight.addEventListener('click', slideForward);
  btnLeft.addEventListener('click', slideBackward);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') slideBackward(); // different ways to write the same code
    e.key === 'ArrowRight' && slideForward(); // different ways to write the same code
  });

  // ----------- Dots functions
  const initializeSliderDots = function () {
    goToSlide(0); //Slide Reset
    createDots(0);
    activateDot(0);
  };
  initializeSliderDots();
  console.log(initializeSliderDots);

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
