fetch('data_breads.json', {
  /* second option inside curly brackets is to send data, delete data, post data back into the database*/
})
  .then(resp => resp.json()) // generates a promise
  .then(breadsData => {
    let { allBreads } = breadsData;
    console.log(allBreads);

    const getBreadTypes = [];
    const returnOneArrayTypesforEachBread = function () {
      for (let i = 0; i < allBreads.length; i++) {
        getBreadTypes.push(allBreads[i].types);
        console.log([i] + ' ' + getBreadTypes[i]); // it prints
        // return [i] + getBreadTypes[i]; // it prints
      }
    };
    returnOneArrayTypesforEachBread();

    // Restablishing json objects information
    allBreads = {
      name: allBreads.name,
      imageURL: allBreads.imageURL,
      types: allBreads.types,
    };
    // console.log(allBreads[0].types); // error

    // 2 Generate HTML with the object info:

    const HTML = `        
    <div class="bread__card">
      <h5>${allBreads.name}</h5>
      <img src="${allBreads.imageURL}" />
      <div class="bread__card-type">
        <p class="bread_type cheese">Cheese</p>
        <p class="bread_type glutenfree">Gluten Free</p>
        <p class="bread_type chocolate">Chocolate</p>
        <p class="bread_type noeggs">No Eggs</p>
        <p class="bread_type glutenfree">Gluten Free</p>
      </div>
      <div class="bread__card-icon">
        <svg class="icon icon-flickr">
          <use href="images/sprite.svg#icon-flickr"></use>
        </svg>
      </div>
    </div>`;

    // Logic for shops cards
    // If odds apply html right
    // if even apply html left.
    // use arrays as they are separetely or access the info as objects?
    // like this:

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

    for (let i = 0; i < allBreads.length; i++) {
      // console.log(` You are at ${allShopsArray[i]} shop`); // Useless. returns You are at [object Object] shop
    }

    /*
       const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
        const data = await res.json();
        // let { recipe } = data.data;
        let recipe = data.data.recipe;
        recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients,
        };
        console.log(recipe);
    */
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
