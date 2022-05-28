const sectionBread = document.querySelector('.section__breads');
const filterHeaderContainer = document.querySelector('.filter__bread-center');
// each cathegory container
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

      const checkedInputs = [];

      // checkedInputs.push(document.querySelectorAll(':checked'));
      // console.log(checkedInputs);

      // breadCards.forEach(breadCard => {
      //   breadCard.classList.remove('bread-hidden');
      // });

      if (
        allFilterWords.some(filterWord =>
          e.target.classList.contains(filterWord)
        )
      ) {
        // console.log(e.target.classList[0]);
        checkedInputs.push(e.target.classList[0]);

        breadCards.forEach(breadCard => {
          if (breadCard.classList.contains(e.target.classList)) {
            console.log(e.target.classList);
            // checkedInputs.push(e.target.classList[0]); // this pushes multiple values of the same class depending on the amount of cards
            // Should I use the map method?

            // if (e.target.checked) {
            //   // console.log(checkedBoxes);
            //   breadCard.classList.contains('bread-active');
            // }
            // if (!e.target.checked) {
            //   console.log('unchecked');
            // }
            // if (breadCard.classList.contains('bread-active')) {
            // }

            // breadCard.classList.add('bread-hidden');
          }
        });

        // if(breadCards.classList(e.target.classList))
      }

      console.log(checkedInputs);

      // // If nothing is checked
      // let checkedBoxes = [];
      // for (i = 0; i < allInputs.length; i++) {
      //   checkedBoxes.push(allInputs[i].checked);
      // }
      // console.log(checkedBoxes);
      // if (!checkedBoxes.includes(true)) {
      //   breadCards.forEach(breadCard => {
      //     breadCard.classList.remove('bread-hidden');
      //   });
      // } else return;
    });
  });

// Another Filter Fail
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

//// --------------------------------------------- ////

//Filter fail  https://codepen.io/piotrek/pen/mXpRmQ
// var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
// var allCards = Array.from(document.querySelectorAll('.bread__card'));
// var checked = {};

// getChecked('allergies');
// getChecked('flavors');
// getChecked('sweets');
// getChecked('noanimals');
// getChecked('seasonal');

// Array.prototype.forEach.call(allCheckboxes, function (el) {
//   el.addEventListener('change', toggleCheckbox);
// });

// function toggleCheckbox(e) {
//   getChecked(e.target.name);
//   setVisibility();
// }

// function getChecked(name) {
//   checked[name] = Array.from(
//     document.querySelectorAll('input[name=' + name + ']:checked')
//   ).map(function (el) {
//     console.log(el.value);
//     return el.value;
//   });
// }

// function setVisibility() {
//   allCards.map(function (el) {
//     var allergies = checked.allergies.length
//       ? _.intersection(Array.from(el.classList), checked.allergies).length
//       : true;
//     var flavors = checked.flavors.length
//       ? _.intersection(Array.from(el.classList), checked.flavors).length
//       : true;
//     var sweets = checked.sweets.length
//       ? _.intersection(Array.from(el.classList), checked.sweets).length
//       : true;
//     var noanimals = checked.noanimals.length
//       ? _.intersection(Array.from(el.classList), checked.noanimals).length
//       : true;
//     var seasonal = checked.seasonal.length
//       ? _.intersection(Array.from(el.classList), checked.seasonal).length
//       : true;
//     if (allergies && flavors && sweets && noanimals && seasonal) {
//       el.style.display = 'flex';
//     } else {
//       el.style.display = 'none';
//     }
//   });
// }
