const sectionBread = document.querySelector('.section__breads');

const filterHeaderContainer = document.querySelector('.filter__bread-center');

const allergiesContainer = document.getElementById('allergies__container');
const flavorsContainer = document.getElementById('flavors__container');
const sweetsContainer = document.getElementById('sweets__container');
const noanimalsContainer = document.getElementById('noanimals__container');

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
        // --------------------------------------------
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

        // --------------------------------------------
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

        sectionBread.innerHTML += createBreadCardHTML;
      }
    };

    returnOneArrayTypesforEachBread(); // call the function to be able to use all the results

    // -------------------------------------------------------
    // ------------- Filter on Header For Breads
    const getFilterWords = breadsData.filterWords;

    let getSubFilter = [];

    // // ---- To create one array with all filter words (for the filter function)
    let arrayMainWords = [];
    // // let arraySubWordsTemporary = [];
    let arraySubWords = [];
    let allFilterWords = [];

    const creatingFilterHTML = function () {
      for (let i = 0; i < getFilterWords.length; i++) {
        // ---------------- Filter Sub
        getSubFilter.push(getFilterWords[i].sub);

        // // ----- Main Array
        arrayMainWords.push(getFilterWords[i].main);
        // // ----- Sub Array
        // console.log(getFilterWords[i].sub.join(' '));
        for (let j = 0; j < getFilterWords.length; j++) {
          arraySubWords.push(getFilterWords[i].sub[j]);
        }
      }
      arraySubWords = arraySubWords.filter(e => e !== undefined);
      // console.log(arraySubWords);
      allFilterWords = [...arrayMainWords, ...arraySubWords];
      // console.log(allFilterWords);

      for (let j = 0; j < getSubFilter[0].length; j++) {
        const allergiesSubFilterFormated = getSubFilter[0][j].replaceAll(
          ' ',
          ''
        );
        const createFilterHTML = `
        <button class="checkbox__option ${allergiesSubFilterFormated}">
          <input type="checkbox"  class="${allergiesSubFilterFormated}"/>
          <label for="${allergiesSubFilterFormated}" class="${allergiesSubFilterFormated}"> ${getFilterWords[0].toDisplay[j]} </label>      
        </button>
        `;
        allergiesContainer.innerHTML += ('afterend', createFilterHTML);
      }

      for (let j = 0; j < getSubFilter[1].length; j++) {
        const flavorsSubFilterFormated = getSubFilter[1][j].replaceAll(' ', '');
        const createFilterHTML = `
        <button class="checkbox__option ${flavorsSubFilterFormated}">
          <input type="checkbox" class="${flavorsSubFilterFormated}"   />
          <label for="${flavorsSubFilterFormated}" class="${flavorsSubFilterFormated}"> ${getFilterWords[1].toDisplay[j]} </label>
        </button>
        `;
        flavorsContainer.innerHTML += ('afterend', createFilterHTML);
      }

      for (let j = 0; j < getSubFilter[2].length; j++) {
        const sweetsSubFilterFormated = getSubFilter[2][j].replaceAll(' ', '');
        const createFilterHTML = `
        <button class="checkbox__option ${sweetsSubFilterFormated}">
          <input type="checkbox" class="${sweetsSubFilterFormated}" />
          <label for="${sweetsSubFilterFormated}" class="${sweetsSubFilterFormated}"> ${getFilterWords[2].toDisplay[j]} </label>
        </button>
        `;
        sweetsContainer.innerHTML += ('afterend', createFilterHTML);
      }

      for (let j = 0; j < getSubFilter[3].length; j++) {
        const noAnimalsSubFilterFormated = getSubFilter[3][j].replaceAll(
          ' ',
          ''
        );
        const createFilterHTML = `
        <button class="checkbox__option ${noAnimalsSubFilterFormated}">
          <input type="checkbox" class="${noAnimalsSubFilterFormated}" />
          <label for="${noAnimalsSubFilterFormated}" class="${noAnimalsSubFilterFormated}"> ${getFilterWords[3].toDisplay[j]} </label>
        </button>
        `;
        noanimalsContainer.innerHTML += ('afterend', createFilterHTML);
      }
    };
    creatingFilterHTML();

    filterHeaderContainer.addEventListener('click', e => {
      const breadCards = document.querySelectorAll('.bread__card');
      const allInputs = document.querySelectorAll('input');
      const checkedInputs = document.querySelectorAll('input:checked');

      // breadCards.forEach(breadCard => {
      //   breadCard.classList.remove('bread-hidden');
      // });

      // console.log(allInput);
      // if no checkbox is checked, then show all results.
      // function check() {
      //   document.getElementById('allergies').checked = true;
      // }
      // check();
      // for (i = 0; i < breadCards.length; i++) {
      //   breadCards[i].classList.remove('bread-hidden');
      // }

      if (
        allFilterWords.some(filterWord =>
          e.target.classList.contains(filterWord)
        )
      ) {
        breadCards.forEach(breadCard => {
          // breadCard.classList.remove('bread-hidden');
          // if (breadCard.classList.contains('bread-hidden')) {
          //   sectionBread.insertAdjacentElement =
          //     '<p class="no_results"> No results </p>';
          // }
          // if (breadCard.classList.contains('bread-active')) {
          // }
          if (breadCard.classList.contains(e.target.classList)) {
            // breadCard.classList.add('bread-active');
            if (!e.target.checked) {
              breadCard.classList.remove('bread-hidden');
            }

            if (e.target.checked) {
              breadCard.classList.contains('bread-active');
            }
            // }
            // if (!e.target.checked) {
            //   console.log('unchecked');
            // }
            // if (breadCard.classList.contains('bread-active'))
          } else {
            breadCard.classList.add('bread-hidden');
          }
        });
        console.log(e.target.classList);

        // if(breadCards.classList(e.target.classList))
      }

      // If nothing is checked
      let checkedBoxes = [];
      for (i = 0; i < allInputs.length; i++) {
        checkedBoxes.push(allInputs[i].checked);
      }
      console.log(checkedBoxes);
      if (!checkedBoxes.includes(true)) {
        breadCards.forEach(breadCard => {
          breadCard.classList.remove('bread-hidden');
        });
      } else return;
    });

    // ::: Events :::
    // function hide(classToHide) {
    //   [].forEach.call(document.querySelectorAll(classToHide), function (el) {
    //     el.hidden = true;
    //   });
    // }

    // // Show the element with classToShow
    // function show(classToShow) {
    //   [].forEach.call(document.querySelectorAll(classToShow), function (el) {
    //     el.hidden = false;
    //   });
    // }
    // // Event for the .com checkbox
    // document.getElementById('chocolate').onchange = function () {
    //   console.log(this);
    //   if (this.checked) show('.chocolate');
    //   else hide('.chocolate');
    // };
    // document.getElementById('allergies').onchange = function () {
    //   console.log(this);
    //   if (this.checked) show('.allergies');
    //   else hide('.allergies');
    // };

    // // Event for the .io checkbox
    // document.getElementById('lactosefree').onchange = function () {
    //   if (this.checked) show('.lactosefree');
    //   else hide('.lactosefree');
    // };

    // // Event for the .org checkbox
    // document.getElementById('sweets').onchange = function () {
    //   if (this.checked) show('.sweets');
    //   else hide('.sweets');
    // };

    // document.getElementById('cheese').onchange = function () {
    //   if (this.checked) show('.cheese');
    //   else hide('.cheese');
    // };

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
