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
  const createDots = () => {
    allSlides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = i => {
    document
      .querySelectorAll('.dots-dot')
      .forEach(dot => dot.classList.remove('dots-dot--active'));
    document
      .querySelector(`.dots-dot[data-slide="${i}"]`)
      .classList.add('dots-dot--active');
  };

  // Slides -------
  const goToSlide = slide => {
    allSlides.forEach(
      (eachSlide, i) =>
        (eachSlide.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const slideForward = () => {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0; // to avoid slide forward to infinity and loop back to the first slide
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide); // applying translateX
    activateDot(currentSlide);
  };

  const slideBackward = () => {
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
  const initializeSliderDots = () => {
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
console.log(sliderFunction);

// Automatically feed the Image Grid
const sectionGallery = document.querySelector('.section__gallery');
fetch('data_homeIMAGES.json', {
  /* second option inside curly brackets is to send data, delete data, post data back into the database*/
})
  .then(resp => resp.json()) // generates a promise
  .then(breadsImagesData => {
    const getBreadImages = breadsImagesData.randomBreadImages;
    console.log(getBreadImages);

    // ------- Variables for Breads
    // --- Name
    let getEachImageURL = [];

    const returnBreadImageFunction = function () {
      for (let i = 0; i < getBreadImages.length; i++) {
        getEachImageURL.push(getBreadImages[i].imageURL);
        console.log(getEachImageURL); // return each name from allBreads object in strings. for each loop

        const createImageBlock = `
        <div class="${getEachImageURL[i]}">
          <img src="images_for_gallery/${getEachImageURL[i]}.webp" />
        </div>`;
        sectionGallery.insertAdjacentHTML('afterbegin', createImageBlock);
      }
    };

    returnBreadImageFunction(); // apply the function to be able to use all the results
    console.log(getEachImageURL);
  });
