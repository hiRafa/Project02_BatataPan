const filter_tokyo = document.querySelector('.tokyo');

// Selectors
const sectionShopsHTML = document.querySelector('.section__shops');
const filterOption = document.querySelector('.filter');

// Creating HTML section

// incomplete, just playing around
const createShopLeft = function(placeName, openHour, closeHour, addressLink, parentElement) {
  markup = `<div class="shop shop-left ${placeName.toLowerCase}" >
  <div class="shop__info">
      <p>${placeName}</p>
      <p>
          Hours: ${openHour} ~ ${closeHour}<br />

          <a href="${addressLink}" target="”_blank”">
          << Map >></a
          >
      </p>
  </div>
  <div class="shop__image">
      <img src="images/bakery01_LQ.jpg" />
  </div>
</div>
}`
parentElement.innerHTML = '';
parentElement.insertAdjacentHTML('beforeend', markup);
};

// incomplete, just playing around
const createShopRight = function(placeName, openHour, closeHour, addressLink) {
  markup = `    <div class="shop shop-right ${placeName.toLowerCase}" >
  <div class="shop__image">
      <img src="images/bakery02_LQ.jpg" />
  </div>
  <div class="shop__info">
      <p>${placeName}</p>
      <p>
      Hours: ${openHour} ~ ${closeHour}<br />
      <a href="${addressLink}" target="”_blank”">
      << Map >></a
      >
      </p>
  </div>
</div>`
parentElement.innerHTML = '';
parentElement.insertAdjacentHTML('beforeend', markup);
};


createShopLeft(Tokyo, 8h, 20h, goo.gl/maps/koGmZFq93JYPCN3N7);
createShopRight(Fujimino, 8h, 20h, goo.gl/maps/koGmZFq93JYPCN3N7);
createShopLeft(Tokyo, 8h, 20h, goo.gl/maps/koGmZFq93JYPCN3N7);

fetch('data.json').then((resp) => resp.json()).then((json) => {
    console.log(json)
})