const sectionBread = document.querySelector('.section__breads');
const sectionFilterHeader = document.querySelector('.filter__bread-center');

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
            <h5 class="bread__card_name ${getBreads[i].breadName.replaceAll(
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

    const getFilterWords = breadsData.filterWords;
    let getEachMainFilter;
    const getSubFilter = [];

    for (let i = 0; i < getFilterWords.length; i++) {
      getEachMainFilter = getFilterWords[i].main;
      console.log(getEachMainFilter);

      const createFilterHTMLAllergies = `
      <button class="checkbox__option">
        <input type="checkbox" id="glutenfree" checked />
        <label for="glutenfree"> Gluten Free </label>      
      </button>
        `;

      sectionFilterHeader.insertAdjacentHTML +=
        ('afterend', createFilterHTMLAllergies);

      function hide(classToHide) {
        [].forEach.call(document.querySelectorAll(classToHide), function (el) {
          el.hidden = true;
        });
      }

      // Show the element with classToShow
      function show(classToShow) {
        [].forEach.call(document.querySelectorAll(classToShow), function (el) {
          el.hidden = false;
        });
      }

      // ::: Events :::

      // Event for the .com checkbox
      document.getElementById('chocolate').onchange = function () {
        console.log(this);
        if (this.checked) show('.chocolate');
        else hide('.chocolate');
      };
      document.getElementById('allergies').onchange = function () {
        console.log(this);
        if (this.checked) show('.allergies');
        else hide('.allergies');
      };

      // Event for the .io checkbox
      document.getElementById('lactosefree').onchange = function () {
        if (this.checked) show('.lactosefree');
        else hide('.lactosefree');
      };

      // Event for the .org checkbox
      document.getElementById('sweets').onchange = function () {
        if (this.checked) show('.sweets');
        else hide('.sweets');
      };
    }
    // const showORhide = value => {
    //   if (this.checked) show(value);
    //   else hide(value);
    // };
    // document.getElementById('chocolate').onchange = showORhide('.chocolate');

    // document.getElementById('allergies').onchange = showORhide('.allergies');

    // document.getElementById('lactosefree').onchange = showORhide('.lactosefree');

    // document.getElementById('sweets').onchange = showORhide('.sweets');
  });

// const allCheckboxes = document.querySelectorAll('input[type=checkbox]');
// const allBreads = Array.from(document.querySelectorAll('.bread'));
// let checked = {};
// console.log(allCheckboxes);
// console.log(allBreads);

// const getChecked = function (value) {
//   checked[value] = Array.from(
//     document.querySelectorAll('input[value=' + value + ']:checked')
//   ).map(function (el) {
//     return el.value;
//   });
// };
// getChecked('allergies');
// getChecked('flavors');
// getChecked('sweets');
// getChecked('noanimals');
// getChecked('specials');

// const setVisibility = () => {
//   allBreads.map(el => {
//     console.log(
//       _.intersection(Array.from(el.classList), checked.allergies).length
//     );
//     let allergies = checked.allergies.length
//       ? _.intersection(Array.from(el.classList), checked.allergies).length
//       : true;
//     let flavors = checked.flavors.length
//       ? _.intersection(Array.from(el.classList), checked.flavors).length
//       : true;
//     let sweets = checked.sweets.length
//       ? _.intersection(Array.from(el.classList), checked.sweets).length
//       : true;
//     let noanimals = checked.noanimals.length
//       ? _.intersection(Array.from(el.classList), checked.noanimals).length
//       : true;
//     let specials = checked.specials.length
//       ? _.intersection(Array.from(el.classList), checked.specials).length
//       : true;
//     if (allergies && flavors && sweets && noanimals && specials) {
//       el.style.display = 'block';
//     } else {
//       el.style.display = 'none';
//     }
//   });
// };

// const toggleCheckbox = e => {
//   getChecked(e.target.name);
//   setVisibility();
// };

// Array.prototype.forEach.call(allCheckboxes, function (el) {
//   el.addEventListener('change', toggleCheckbox);
// });

//----------------------------
//checkbox trial
// const checkboxes = document.querySelectorAll("input[type='checkbox']");
// const cardsContainer = document.getElementById('section__breads');
// let checkboxValues = [];

// checkboxes.forEach(box => {
//   box.checked = false;
//   box.addEventListener('change', () => filterCards());
// });

// function grabCheckboxValues() {
//   let checkboxValues = [];
//   checkboxes.forEach(checkbox => {
//     if (checkbox.checked) checkboxValues.push(checkbox.value);
//   });
//   return checkboxValues;
// }

// function filterCards() {
//   wrapper.innerHTML = '';
//   checkboxValues = grabCheckboxValues();
//   data.forEach(item => {
//     let classes = item.classes;
//     let result = (arr, target) => target.every(v => arr.includes(v));
//     let isMatch = result(classes, checkboxValues);
//     if (isMatch) {
//       var card = `
//         <div data-aos="flip-down" data-aos-duration=500 class="card" style="padding:10px; min-width:400px;  background-color:#CCC; margin:10px;">
//         <h1 class="title">${item.title}</h1>
//         </div>
//     `;
//       wrapper.innerHTML += card;
//     }
//   });
// }
