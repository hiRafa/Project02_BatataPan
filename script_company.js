const tabsButtonContainer = document.querySelector('.tab__button__container');
const tabs = document.querySelectorAll('.button__tab');
const tabsContent = document.querySelectorAll('.tab__content');

tabsButtonContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.button__tab'); //to target the button with the icon or any spam that might be together.
  // const clicked = e.target; // would be enough to target the button itself only.
  console.log(clicked); //just to check the state

  if (!clicked) return; //Guard Clause to return in case of null

  //Active Button
  tabs.forEach(t => t.classList.remove('button__tab-active')); //to clear all classes before adding to any
  clicked.classList.add('button__tab-active');

  //Active Content
  tabsContent.forEach(t => t.classList.remove('tab__content-active')); // to clear
  document
    .querySelector(`.tab__content--${clicked.dataset.tab}`)
    .classList.add('tab__content-active');
});
