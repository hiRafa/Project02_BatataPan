const sectionBread = document.querySelector('.section__breads');
const filterHeaderContainer = document.querySelector('.header-breads_shops');
// each cathegory container
const allergiesContainer = document.getElementById('allergies__container');
const flavorsContainer = document.getElementById('flavors__container');
const sweetsContainer = document.getElementById('sweets__container');
const noanimalsContainer = document.getElementById('noanimals__container');
const specialsContainer = document.getElementById('specials__container');

fetch('data_breads.json', {
  /* second option inside curly brackets is to send data, delete data, post data back into the database*/
})
  .then(resp => resp.json()) // generates a promise
  .then(breadsData => {
    const getBreads = breadsData.allBreads;
    // console.log(getBreads);

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
        getEachBreadName = getBreads[i].breadName;
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
            // console.log(getBreadTypesTemporary);
          });
          rearrayBreadTypes.push(getBreadTypesTemporary);
        }
        // console.log(rearrayBreadTypes);

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
                  */

        // ---------- Organize Bread Big Categories

        // console.log(getBreads[i].breadName.replaceAll(' ', '_'));
        // console.log(formatedBreadName[i]);

        // setting all keys from the object to use them below
        // let breadName, imageURL, bigCategory, types, description, price;

        const createBreadCardHTML = `
          <div class="bread__card bread  ${getBreads[i].bigCategory.replaceAll(
            ',',
            ' '
          )} ${getBreads[i].types.join(' ')}">
            <p class="bread__card_name ${getBreads[i].breadName.replaceAll(
              ' ',
              '_'
            )}">
            ${formatedBreadName[i]}</p>
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

    // -------------------------------------------------------
    // ------------- Filter on Header For Breads
    const getFilterWords = breadsData.filterWords;

    let getSubFilter = [];

    // // ---- To create one array with all filter words (for the filter function)
    let arrayMainWords = [];
    // // let arraySubWordsTemporary = [];
    let arraySubWords = [];

    const creatingFilterHTML = function () {
      for (let i = 0; i < getFilterWords.length; i++) {
        // ---------------- Filter Sub
        getSubFilter.push(getFilterWords[i].sub);

        // // ----- Main Array
        arrayMainWords.push(getFilterWords[i].main);
        // // ----- Sub Abutton__breadsrray
        // console.log(getFilterWords[i].sub.join(' '));
        for (let j = 0; j < getFilterWords.length; j++) {
          arraySubWords.push(getFilterWords[i].sub[j]);
        }
      }
      arraySubWords = arraySubWords.filter(e => e !== undefined);
      // console.log(arraySubWords);

      // console.log(allFilterWords);

      for (let j = 0; j < getSubFilter[0].length; j++) {
        const allergiesSubFilterFormated = getSubFilter[0][j].replaceAll(
          ' ',
          ''
        );
        const createFilterHTML = `
        <button class="button__breads ${allergiesSubFilterFormated}" data-filter="${allergiesSubFilterFormated}">
          ${getFilterWords[0].toDisplay[j]} 
        </button>`;
        allergiesContainer.innerHTML += ('afterend', createFilterHTML);
      }

      for (let j = 0; j < getSubFilter[1].length; j++) {
        const flavorsSubFilterFormated = getSubFilter[1][j].replaceAll(' ', '');
        const createFilterHTML = `
        <button class="button__breads ${flavorsSubFilterFormated}" data-filter="${flavorsSubFilterFormated}">
          ${getFilterWords[1].toDisplay[j]}
        </button>`;
        flavorsContainer.innerHTML += ('afterend', createFilterHTML);
      }

      for (let j = 0; j < getSubFilter[2].length; j++) {
        const sweetsSubFilterFormated = getSubFilter[2][j].replaceAll(' ', '');
        const createFilterHTML = `
        <button class="button__breads ${sweetsSubFilterFormated}" data-filter="${sweetsSubFilterFormated}">
          ${getFilterWords[2].toDisplay[j]}
        </button>`;
        sweetsContainer.innerHTML += ('afterend', createFilterHTML);
      }

      for (let j = 0; j < getSubFilter[3].length; j++) {
        const noAnimalsSubFilterFormated = getSubFilter[3][j].replaceAll(
          ' ',
          ''
        );
        const createFilterHTML = `
        <button class="button__breads ${noAnimalsSubFilterFormated}" data-filter="${noAnimalsSubFilterFormated}">
          ${getFilterWords[3].toDisplay[j]}
        </button>`;
        noanimalsContainer.innerHTML += ('afterend', createFilterHTML);
      }

      for (let j = 0; j < getSubFilter[4].length; j++) {
        const specialsSubFilter = getSubFilter[4][j].replaceAll(' ', '');
        const createFilterHTML = `
        <button class="button__breads ${specialsSubFilter}" data-filter="${specialsSubFilter}">
          ${getFilterWords[4].toDisplay[j]}
        </button>`;
        specialsContainer.innerHTML += ('afterend', createFilterHTML);
      }
    };
    creatingFilterHTML();

    const filterOptionsContainer = document.querySelector(
      '.header-breads_shops'
    );
    const filterShopsBtn = document.querySelectorAll('.button__breads');
    const shopCards = document.querySelectorAll('.bread__card');

    filterOptionsContainer.addEventListener('touchstart', e => {
      const filterOption = e.target;
      const dataFilterButton = e.target.dataset.filter;
      console.log(dataFilterButton);
      // Clear class shop-active
      filterShopsBtn.forEach(t => t.classList.remove('button__breads-active'));

      // Start adding class shop-active according to selection
      // DRY
      const showShopAndActiveButton = function (selectedShop) {
        selectedShop.style.display = 'flex';
        filterOption.classList.add('button__breads-active');
      };
      shopCards.forEach(selectedShop => {
        if (dataFilterButton === undefined) {
          shopCards.forEach(t => (t.style.display = 'flex'));
        }
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
  });
