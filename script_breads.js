const sectionBread = document.querySelector('.section__breads');

// 2 Generate HTML with the object info:

// Logic for shops cards
// If odds apply html right
// if even apply html left.
// use arrays as they are separetely or access the info as objects?
// like this:

fetch('data_breads.json', {
  /* second option inside curly brackets is to send data, delete data, post data back into the database*/
})
  .then(resp => resp.json()) // generates a promise
  .then(breadsData => {
    let getBreads = breadsData.allBreads;
    console.log(getBreads);

    let getEachBreadName = ' ';
    let stringfyBreadName = [];
    let splitBreadName = ' ';
    let formatBreadName = [];

    const getBreadTypes = [];

    const returnOneArrayTypesforEachBread = function () {
      for (let i = 0; i < getBreads.length; i++) {
        //breads length would always be the total amount of objects in the data json file.

        // ------------- Organize Bread Names
        getEachBreadName = getBreads[i].name;

        console.log(getEachBreadName); // return each name from allBreads object in strings. for each loop
        splitBreadName = getEachBreadName.split(' ');
        console.log(splitBreadName); // return array with name separated in items.  for each loop
        for (let i = 0; i < splitBreadName.length; i++) {
          splitBreadName[i] =
            splitBreadName[i].charAt(0).toUpperCase() +
            splitBreadName[i].slice(1);
          console.log(splitBreadName);
        }
        formatBreadName.push(splitBreadName.join(' '));
        console.log(formatBreadName);

        // for (let i = 0; i < splitBreadName.length; i++) {
        //   console.log(splitBreadName[i]);
        //   splitBreadName.forEach(
        //     element =>
        //       // console.log(element[0].toUpperCase() + element.slice(1))
        //       (formatBreadName +=
        //         element[0].toUpperCase() + element.slice(1) + ' ')
        //     // formatBreadName.push(`${element[0].toUpperCase()}${element.slice(1)}`);
        //     // console.log(formatBreadName);
        //   );
      }
      console.log(formatBreadName);

      /*do not use splitBreadName[i]*/ // console.log(splitBreadName[i]); // return the 0 word from array 0, return 1 word from array 1,
      /* // It doesnt work
        // firstLetterUpperCase = splitBreadName[i].toUpperCase();
        // console.log(firstLetterUpperCase);
        */

      // // ------------- Organize Image URL

      // // ---------- Organize Bread Types
      // getBreadTypes.push(getBreads[i].types);
      // console.log(getBreadTypes[i]);
      // console.log([i] + ' ' + getBreadTypes[i]); // it prints
      // return [i] + getBreadTypes[i];
    };
    console.log(getEachBreadName);

    for (let i = 0; i < getBreads.length; i++) {
      // console.log(getBreads[i].name);

      const breadCardHTML = `        
        <div class="bread__card">
          <h5 class="${getBreads[i].name}">
          ${
            getBreads[i].name[0].toUpperCase() + getBreads[i].name.slice(1)
          }</h5>
          <img src="images/bread_pineapple_x1.webp" />
          <div class="bread__card-type">
            <p class="bread_type cheese">Cheese</p>
            <p class="bread_type glutenfree">Gluten Free</p>
            <p class="bread_type glutenfree">Chocolate</p>
            <p class="bread_type glutenfree">Gluten Free</p>
            <p class="bread_type glutenfree">Gluten Free</p>
          </div>
          <div class="bread__card-icon">
            <svg class="icon icon-flickr">
              <use href="images/sprite.svg#icon-flickr"></use>
            </svg>
          </div>
        </div>`;
      // console.log(breadCardHTML);
      // sectionBread.innerHTML = breadCardHTML; // wrong, because it replaces the same card with different info showing only the last info
      // sectionBread.innerHTML += breadCardHTML;
    }

    returnOneArrayTypesforEachBread();
    console.log(getBreadTypes);
    // getBreadTypes.forEach(element, index);
    // for (let i = 0; i < getBreadTypes.length; i++) {}
    // Restablishing json objects information

    // for (let i = 0; i < getBreads.length; i++) {
    //   console.log(getBreads[i]);
    // }

    // console.log(getBreads[0].types); // error

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
  });

// --------------------------------------------------------------------------
// ------------------ FILTER
// --------------------------------------------------------------------------
// const filterOptionsContainer = document.querySelector('.filter-bottom');
// const filterShopsBtn = document.querySelectorAll('.filter__button');
// const shops = document.querySelectorAll('.shop');

// filterOptionsContainer.addEventListener('click', e => {
//   const filterOption = e.target;
//   const dataFilterButton = e.target.dataset.filter;

//   // Clear class shop-active
//   filterShopsBtn.forEach(t => t.classList.remove('shop-active'));

//   // Start adding class shop-active according to selection
//   // DRY
//   const showShopAndActiveButton = function (selectedShop) {
//     selectedShop.style.display = 'flex';
//     filterOption.classList.add('filter__button-active');
//   };
//   shops.forEach(selectedShop => {
//     if (dataFilterButton === 'all') {
//       showShopAndActiveButton(selectedShop); // DRY
//       // selectedShop.style.display = 'flex';
//       // filterOption.classList.add('shop-active');
//     } else {
//       if (selectedShop.classList.contains(dataFilterButton)) {
//         showShopAndActiveButton(selectedShop); // DRY
//         // selectedShop.style.display = 'flex';
//         // filterOption.classList.add('shop-active');
//       } else {
//         selectedShop.style.display = 'none';
//       }
//     }
//   });
// });

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
