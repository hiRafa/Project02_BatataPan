const sectionBread = document.querySelector('.section__breads');

fetch('data_breads.json', {
  /* second option inside curly brackets is to send data, delete data, post data back into the database*/
})
  .then(resp => resp.json()) // generates a promise
  .then(breadsData => {
    const getBreads = breadsData.allBreads;
    console.log(getBreads);

    // ------- Variables for Breads
    // --- Name
    let getEachBreadName, splitBreadName;
    const formatedBreadName = [];

    // --- Type
    const getBreadTypes = [];

    const returnOneArrayTypesforEachBread = function () {
      for (let i = 0; i < getBreads.length; i++) {
        //breads length would always be the total amount of objects in the data json file.

        // ------------- Organize Bread Names
        getEachBreadName = getBreads[i].name;
        // console.log(getEachBreadName); // return each name from allBreads object in strings. for each loop
        splitBreadName = getEachBreadName.split(' ');
        // console.log(splitBreadName); // return array with name separated in items.  for each loop
        for (let i = 0; i < splitBreadName.length; i++) {
          splitBreadName[i] =
            splitBreadName[i].charAt(0).toUpperCase() +
            splitBreadName[i].slice(1);
          // console.log(splitBreadName);
        }
        formatedBreadName.push(splitBreadName.join(' ')); // for loop has to act on this method push to create the full array
        // console.log(formatedBreadName);

        /* wrong code
        /*do not use splitBreadName[i] // console.log(splitBreadName[i]); // return the 0 word from array 0, return 1 word from array 1,
        // It doesnt work
        // firstLetterUpperCase = splitBreadName[i].toUpperCase();
        // console.log(firstLetterUpperCase);
        */

        // ---------- Organize Bread Types
        getBreadTypes.push(getBreads[i].types);
        const rearrayBreadTypes = []; // if this variable goes to the parent, the for loop below has to go with it.

        for (let i = 0; i < getBreadTypes.length; i++) {
          const getBreadTypesTemporary = []; // this array is reset everytime one lopp finishes
          getBreadTypes[i].forEach(function (item) {
            getBreadTypesTemporary.push(`<p> ${item.toUpperCase()} </p>`);
            console.log(getBreadTypesTemporary);
          });
          rearrayBreadTypes.push(getBreadTypesTemporary);
        }
        console.log(rearrayBreadTypes);

        /* WRONG CODE 
      // console.log(getBreadTypes[i]);
      // const iterateBreadTypeArray = function (item) {
      //   console.log(`<p> ${item.toUpperCase()} </p>`); // returns item by items before going to the next array
      //   createHTMLforBreadTypes += `<p> ${item} </p>`;
      //   console.log(createHTMLforBreadTypes);
      // };

      // getBreadTypes[i].forEach(function (item) {
      //   console.log(`<p> ${item.toUpperCase()} </p>`);
      //   createHTMLforBreadTypes.push(`<p> ${item.toUpperCase()} </p>`);
      //   console.log(createHTMLforBreadTypes);
      // });
      // out = [createHTMLforBreadTypes];
      // console.log(out);

      // getBreadTypes[i].forEach(function (item) {
      //   out[item] = getBreadTypes[i].filter(valueArr =>
      //     valueArr.includes(item)
      //   );
      //   console.log(`<p> ${item.toUpperCase()} </p>`);
      //   createHTMLforBreadTypes.push(`<p> ${item.toUpperCase()} </p>`);
      //   console.log(createHTMLforBreadTypes);
      // }); */

        // console.log(getBreads[i].name.replaceAll(' ', '_'));
        // console.log(formatedBreadName[i]);

        const createBreadCardHTML = `
          <div class="bread__card ">
            <h5 class="bread__card_name ${getBreads[i].name.replaceAll(
              ' ',
              '_'
            )}">
            ${formatedBreadName[i]}</h5>
            <img class="bread__card_img "src="images/${
              getBreads[i].imageURL
            }.webp" />
            <div class="bread__card_type">
              ${rearrayBreadTypes[i].join(' ')}
            </div>
            <div class="bread__card_icon">
              <svg class="icon icon-flickr">
                <use href="images/sprite.svg#icon-flickr"></use>
              </svg>
            </div>
          </div>`;
        // console.log(createBreadCardHTML);
        // sectionBread.innerHTML = createBreadCardHTML; // wrong, because it replaces the same card with different info showing only the last info
        sectionBread.innerHTML += createBreadCardHTML;

        // ------------------------- SAMPLE
        // for (let i = 0; i < allShopsArray.length; i++) {
        //   getShopName += `<li> ${allShopsArray[i].shopName} </li>`;
        //   document.getElementById('shops_nameList').innerHTML = getShopName;
        //   // console.log(allShopsArray[i].shopName);
        // ------------------------- SAMPLE
      }
    };

    returnOneArrayTypesforEachBread(); // apply the function to be able to use all the results
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
