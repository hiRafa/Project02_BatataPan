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
  console.log(entry);
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
