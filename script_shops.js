const filter_tokyo = document.querySelector('.tokyo');

// Selectors
const sectionShopsHTML = document.querySelector('.section__shops');
const filterOption = document.querySelector('.filter');

fetch('data_shops.json', {
  /* second option inside curly brackets is to send data, delete data, post data back into the database*/
})
  .then(resp => resp.json()) // generates a promise
  .then(shopsData => {
    console.log(shopsData.shops);

    let allShopsArray = shopsData.shops;
    let getShopName = [];
    let getOpenHr = [];
    let getCloseHr = [];
    const getAddressLink = [];

    for (let i = 0; i < allShopsArray.length; i++) {
      getShopName.push(allShopsArray[i].shopName);
      getOpenHr.push(allShopsArray[i].openHr);
      getCloseHr.push(allShopsArray[i].closeHr);
      getAddressLink.push(allShopsArray[i].address);
      // console.log(` You are at ${allShopsArray[i]} shop`); // Useless. returns You are at [object Object] shop
      console.log(getAddressLink[i]);
    }

    // console.log(` You are at ${getShopName} shop`);
    // console.log(getShopName);
    // console.log(getOpenHr);
    // console.log(getCloseHr);
    // console.log(getAddressLink);
  });

// --------------------------------------------------------------------------
// ------------------ FILTER
// --------------------------------------------------------------------------
const filterOptionsContainer = document.querySelector('.filter-bottom');
const filterShopsBtn = document.querySelectorAll('.filter__button');
const shopCards = document.querySelectorAll('.shop');

filterOptionsContainer.addEventListener('click', e => {
  const filterOption = e.target;
  const dataFilterButton = e.target.dataset.filter;

  // Clear class shop-active
  filterShopsBtn.forEach(t => t.classList.remove('filter__button-active'));

  // Start adding class shop-active according to selection
  // DRY
  const showShopAndActiveButton = function (selectedShop) {
    selectedShop.style.display = 'flex';
    filterOption.classList.add('filter__button-active');
  };
  shopCards.forEach(selectedShop => {
    if (dataFilterButton === 'all') {
      showShopAndActiveButton(selectedShop); // DRY
      // selectedShop.style.display = 'flex';
      // filterOption.classList.add('shop-active');
    } else {
      if (selectedShop.classList.contains(dataFilterButton)) {
        showShopAndActiveButton(selectedShop); // DRY
        // selectedShop.style.display = 'flex';
        // filterOption.classList.add('shop-active');
      } else {
        selectedShop.style.display = 'none';
      }
    }
  });
});

// --------------------------------------------------------------------------
//----------------------- Filter Original BACK UP (by Zino, Ewomazino Akpareva)
// --------------------------------------------------------------------------

// const filterShopsBtn = document.querySelectorAll('.filter__button');
// const shops = document.querySelectorAll('.shop');
// // const search = document.getElementById(search);
// for (i = 0; i < filterShopsBtn.length; i++) {
//   filterShopsBtn[i].addEventListener('click', e => {
//     e.preventDefault();
//     console.log(`Hello ${getShopName}`);

//     const filterOption = e.target;
//     const filter = e.target.dataset.filter;

//     // console.log(filterOption.innerText);
//     // console.log(filter);
//     // console.log(filterShopsBtn);

//     shops.forEach(selectedShop => {
//       if (filter === 'all') {
//         selectedShop.style.display = 'flex';
//       } else {
//         if (selectedShop.classList.contains(filter)) {
//           selectedShop.style.display = 'flex';
//           filterOption.classList.add('filter__button-active');
//         } else {
//           selectedShop.style.display = 'none';
//         }
//       }
//     });
//   });
// }
