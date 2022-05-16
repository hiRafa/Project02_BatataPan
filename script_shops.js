const filter_tokyo = document.querySelector('.tokyo');

// Selectors
const sectionShopsHTML = document.querySelector('.section__shops');
const filterOption = document.querySelector('.filter');

// // Creating HTML section
// const renderShops = function (parentElement) {
//   markup = `
//     <div class="shop shop-left tokyo">
//         <div class="shop__info">
//             <p>Tokyo</p>
//             <p>
//                 Hours: 8:00 ~ 20:00<br />

//                 <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//                 << Map >></a
//                 >
//             </p>
//         </div>
//         <div class="shop__image">
//             <img src="images/bakery01_LQ.jpg" />
//         </div>
//     </div>

//     <div class="shop shop-right kinshicho" >
//         <div class="shop__image">
//             <img src="images/bakery02_LQ.jpg" />
//         </div>
//         <div class="shop__info">
//             <p>Kinshicho</p>
//             <p>
//             Hours: 8:00 ~ 20:00<br />
//             <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//             << Map >></a
//             >
//             </p>
//         </div>
//     </div>

//     <div class="shop shop-left tachikawa" value="tachikawa">
//         <div class="shop__info">
//             <p>Tachikawa</p>
//             <p>
//                 Hours: 8:00 ~ 20:00<br />

//                 <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//                 << Map >></a
//                 >
//             </p>
//         </div>
//         <div class="shop__image">
//             <img src="images/bakery01_LQ.jpg" />
//         </div>
//     </div>

//     <div class="shop shop-right shinagawa" >
//       <div class="shop__image">
//           <img src="images/bakery02_LQ.jpg" />
//       </div>
//       <div class="shop__info">
//           <p>Shinagawa</p>
//           <p>
//           Hours: 8:00 ~ 20:00<br />
//           <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//           << Map >></a
//           >
//           </p>
//       </div>
//     </div>

//     <div class="shop shop-left yokohama">
//         <div class="shop__info">
//             <p>Yokohama</p>
//             <p>
//                 Hours: 8:00 ~ 20:00<br />

//                 <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//                 << Map >></a
//                 >
//             </p>
//         </div>
//         <div class="shop__image">
//             <img src="images/bakery01_LQ.jpg" />
//         </div>
//     </div>

//     <div class="shop shop-right funabashi" >
//         <div class="shop__image">
//             <img src="images/bakery02_LQ.jpg" />
//         </div>
//         <div class="shop__info">
//             <p>Funabashi</p>
//             <p>
//             Hours: 8:00 ~ 20:00<br />
//             <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//             << Map >></a
//             >
//             </p>
//         </div>
//     </div>

//     <div class="shop shop-left fujimino" >
//         <div class="shop__info">
//             <p>Fujimino</p>
//             <p>
//                 Hours: 8:00 ~ 20:00<br />

//                 <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//                 << Map >></a
//                 >
//             </p>
//         </div>
//         <div class="shop__image">
//             <img src="images/bakery01_LQ.jpg" />
//         </div>
//     </div>

//     <div class="shop shop-right saitama" >
//       <div class="shop__image">
//           <img src="images/bakery02_LQ.jpg" />
//       </div>
//       <div class="shop__info">
//           <p>Saitama</p>
//           <p>
//           Hours: 8:00 ~ 20:00<br />
//           <a href="https://goo.gl/maps/koGmZFq93JYPCN3N7" target="”_blank”">
//           << Map >></a
//           >
//           </p>
//       </div>
//     </div>
//     `;
//   parentElement.innerHTML = '';
//   parentElement.insertAdjacentHTML('afterbegin', markup);
// };

fetch('data.json', {
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

    // ------------------------- SAMPLE
    // for (let i = 0; i < allShopsArray.length; i++) {
    //   getShopName += `<li> ${allShopsArray[i].shopName} </li>`;
    //   document.getElementById('shops_nameList').innerHTML = getShopName;
    //   // console.log(allShopsArray[i].shopName);

    //   getOpenHr += `<li> ${allShopsArray[i].openHr} </li>`;
    //   document.getElementById('shops_openList').innerHTML = getOpenHr;

    //   getCloseHr += `<li> ${allShopsArray[i].closeHr} </li>`;
    //   document.getElementById('shops_closeList').innerHTML = getCloseHr;
    // }
    // ------------------------- SAMPLE

    for (let i = 0; i < allShopsArray.length; i++) {
      getShopName.push(allShopsArray[i].shopName);
      getOpenHr.push(allShopsArray[i].openHr);
      getCloseHr.push(allShopsArray[i].closeHr);
      getAddressLink.push(allShopsArray[i].address);
      // console.log(` You are at ${allShopsArray[i]} shop`); // Useless. returns You are at [object Object] shop
    }
    console.log(` You are at ${getShopName} shop`);
    console.log(getShopName);
    console.log(getOpenHr);
    console.log(getCloseHr);
    console.log(getAddressLink);

    
  });



// --------------------------------------------------------------------------
// ------------------ FILTER
// --------------------------------------------------------------------------
const filterOptionsContainer = document.querySelector('.filter-bottom');
const filterShopsBtn = document.querySelectorAll('.filter__button');
const shops = document.querySelectorAll('.shop');

filterOptionsContainer.addEventListener('click', e => {
  const filterOption = e.target;
  const dataFilterButton = e.target.dataset.filter;

  // Clear class shop-active
  filterShopsBtn.forEach(t => t.classList.remove('shop-active'));

  // Start adding class shop-active according to selection
  // DRY
  const showShopAndActiveButton = function (selectedShop) {
    selectedShop.style.display = 'flex';
    filterOption.classList.add('shop-active');
  };
  shops.forEach(selectedShop => {
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
//           filterOption.classList.add('shop-active');
//         } else {
//           selectedShop.style.display = 'none';
//         }
//       }
//     });
//   });
// }
