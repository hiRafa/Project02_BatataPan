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

// const filterTodo = function (e) {
//   //selecting all items of the list
//   const shops = sectionShopsHTML.childNodes;
//   console.log(shops);

//   // checking on each item if they contain completed or not or if they are all
//   shops.forEach(function (e, item) {
//     switch (
//       e.target.value //the value is in the html element
//     ) {
//       case 'all':
//         item.style.display = 'flex';
//         break;
//       case 'kinshicho': {
//         if (item.classList.contains('kinshicho')) {
//           item.style.display = 'flex';
//         } else {
//           item.style.display = 'none';
//         }
//         break;
//       }
//       case 'tachikawa': {
//         if (item.classList.contains('tachikawa')) {
//           // since we only added "completed" class to nodes, it is not possible to check for uncompleted. therefore we need to invert the condition with !
//           item.style.display = 'flex';
//         } else {
//           item.style.display = 'none';
//         }
//         break;
//       }
//     }
//   });
// };

// renderShops(sectionShopsHTML);
// filterTodo();

const filterShopsBtn = document.querySelectorAll('.filter__button');
const shops = document.querySelectorAll('.shop');
// const search = document.getElementById(search);

for (i = 0; i < filterShopsBtn.length; i++) {
  filterShopsBtn[i].addEventListener('click', e => {
    e.preventDefault();

    const filter = e.target.dataset.filter;
    console.log(filter);
    console.log(filterShopsBtn);

    shops.forEach(product => {
      if (filter === 'all') {
        product.style.display = 'flex';
      } else {
        if (product.classList.contains(filter)) {
          product.style.display = 'flex';
        } else {
          product.style.display = 'none';
        }
      }
    });
  });
}
