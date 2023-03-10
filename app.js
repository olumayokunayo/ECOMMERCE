// DISPLAY API ON SCREEN

let screen = document.getElementById("show");

fetch("https://fakestoreapi.com/products/")
  .then((res) => res.json())
  .then((json) => {
    // console.log(json);
    for (let index = 0; index < json.length; index++) {
      const element = json[index];
      // console.log(element);
      screen.innerHTML += `<div class="itemContainer">
              <div class="item">
        <img src="${element.image}" class="img" />
        <p class="title"> ${element.title}</p>
        <div class="priceCart">
        <p class="rating"><ion-icon name="star-half-outline"></ion-icon> ${element.rating.rate}</p>
        <p class="price">$${element.price}</p>
        </div>
        <button class="btnOpenModal" onclick="btnOpen(${element.id})"><ion-icon name="add-outline"></ion-icon></button>
    <div id="modal-${element.id}" class="modal">
    <div class="modalOverlay" onclick="modalOver()"></div>
    <div class="modalContent">
    <button class="closeBtn" onclick="btnClose(${element.id})"><span class="material-symbols-outlined">
    close
    </span></button>
    <img src="${element.image}" class="img" />
    <p class="title"> ${element.title}</p>
    <p class="price">$${element.price}</p>
    <div class="qtyDiv">
    <p>Quantity: </p> 
    <div class="qty">
    <button class="minus" onclick="minusBtn(${element.id})"><span class="material-symbols-outlined">
    remove
    </span></button><span><input type="text" id="inputNum-${element.id}" value="1"></span>
    
    <button class="plus" onclick="plusBtn(${element.id})"><span class="material-symbols-outlined">
    add
    </span></button>
    </div>
    </div>
    <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
    add_shopping_cart
    </span> ADD TO CART  </button>
    </div>
      </div>
      </div>
    </div>
   `;
    }
  });

//   OPEN MODAL

function btnOpen(id) {
  console.log(`hey${id}`);
  //   console.log(productID);
  const modal = document.querySelector(`#modal-${id}`);
  modal.style.display = "block";
}

// CLOSE MODAL

function btnClose(id) {
  const modal = document.querySelector(`#modal-${id}`);
  modal.style.display = "none";
}
// document.addEventListener("click", function (e) {
//   const modal = e.target.closest(".modal");
//   if (modal) {
//     modal.style.display = "none";
//   }
// });

// document,
//   addEventListener("keydown", function (e) {
//     const modal = document.querySelector(".modal");
//     if (e.key == "Escape" && modal) {
//       modal.style.display = "none";
//     }
//   });
// BUY BUTTON

function buyBtn(id) {
  const modal = document.querySelector(`#modal-${id}`);
  let inputNum = document.getElementById(`inputNum-${id}`);
  //   console.log(inputNum.value);
  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((json) => {
      //   console.log(json);
      for (let index = 0; index < json.length; index++) {
        const product = json[index];
        if (product.id == id) {
          let item = {
            name: product.title,
            image: product.image,
            quantity: inputNum.value,
            price: product.price,
            total: product.price * inputNum.value,
          };
          // console.log(total);
          let cartArr = JSON.parse(localStorage.getItem("item")) || [];
          cartArr.push(item);
          localStorage.setItem("item", JSON.stringify(cartArr));
          count();
          updateTotal();
          modal.style.display = "none";
          alert(
            `(${inputNum.value}) ${product.title} have been added to cart!`
          );
          break;
        }
      }
    });
}

// QUANTITY BUTTONS
let min = 1;
let max = 10;

function plusBtn(productID) {
  let inputNum = document.getElementById(`inputNum-${productID}`);

  if (!inputNum.value) {
    inputNum.value = 1;
  } else {
    inputNum.value = parseInt(inputNum.value) + 1;
    // console.log(inputNum.value);
  }
  if (inputNum.value >= max) {
    inputNum.value = max;
    // console.log(inputNum.value);
    alert("Max limit reached!");
    return;
  }
}

function minusBtn(productID) {
  let inputNum = document.getElementById(`inputNum-${productID}`);
  if (!inputNum.value) {
    inputNum.value = 1;

    // console.log(inputNum.value);
  } else {
    inputNum.value = parseInt(inputNum.value) - 1;
  }
  if (inputNum.value <= min) {
    inputNum.value = min;
    // console.log(inputNum.value);
    alert("Min limit reached!");
  }
}
// CAROUSEL

let imagesArr = [
  "./images/shop1.jpg",
  "./images/shop2.jpg",
  "./images/shop3.jpg",
  "./images/shop4.jpg",
  "./images/shop5.jpg",
  "./images/shop9.jpg",
  "./images/shop10.jpg",
];
let index = 0;
let mainImage = document.getElementById("mainImage");
let prevBtn = document.getElementById("btnLeft");
let nextBtn = document.getElementById("btnRight");

// Prev Button
prevBtn.addEventListener("click", function () {
  index--;
  mainImage.setAttribute("src", imagesArr[index]);
  if (index == 0) {
    index = 6;
  }
});

// Next Button

nextBtn.addEventListener("click", function () {
  index++;
  mainImage.setAttribute("src", imagesArr[index]);
  if (index == 6) {
    index = 0;
  }
});

function load() {
  setInterval(() => {
    index++;
    mainImage.setAttribute("src", imagesArr[index]);
    if (index == 6) {
      index = 0;
    }
  }, 3000);
}
load();
//  CATEGORIES
let updateShow = document.querySelector(".update");
let mensShow = document.getElementById("mensShow");
let womensShow = document.getElementById("womensShow");
let jeweleryShow = document.getElementById("jeweleryShow");
let electShow = document.getElementById("electShow");

let mensBtn = document.getElementById("mensBtn");
let womensBtn = document.getElementById("womensBtn");
let jeweleryBtn = document.getElementById("jeweleryBtn");
let electBtn = document.getElementById("electBtn");

// MEN'S CATEGORY

mensBtn.addEventListener("click", function () {
  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((json) => {
      screen.innerHTML = "";
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        // console.log(element);
        const category = element.category.toLowerCase();
        // console.log(category);

        if (category == "men's clothing") {
          mensShow.innerHTML += `<div class="category">
                <div class="item">
                <img src="${element.image}" class="img" />
                <p class="title">${element.title}</p>
                <p class="rating">
                <ion-icon name="star-half-outline"></ion-icon> ${element.rating.rate}
                </p>
                <p class="price">$${element.price}</p>
                <button class="btnOpenModal" onclick="btnOpen(${element.id})"><ion-icon name="add-outline"></ion-icon></button>
                <div id="modal-${element.id}" class="modal">
                <div class="modalOverlay" onclick="modalOver()"></div>
                <div class="modalContent">
                <button class="closeBtn" onclick="btnClose(${element.id})"><span class="material-symbols-outlined">
                close
                </span></button>
                <img src="${element.image}" class="img" />
                <p class="title"> ${element.title}</p>
                <p class="price">$${element.price}</p>
                <div class="qtyDiv">
                <p>Quantity: </p> 
                <div class="qty">
                <button class="minus" onclick="minusBtn(${element.id})"><span class="material-symbols-outlined">
                remove
                </span></button><span><input type="text" id="inputNum-${element.id}" value="1"></span>
    
                <button class="plus" onclick="plusBtn(${element.id})"><span class="material-symbols-outlined">
                add
                </span></button>
                </div>
                </div>
                <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
                add_shopping_cart
                </span> ADD TO CART  </button>
                </div>
                </div>
                </div>
                </div>`;
          screen.style.display = "none";
          electShow.style.display = "none";
          jeweleryShow.style.display = "none";
          womensShow.style.display = "none";
          mensShow.style.display = "flex";
          updateShow.textContent = "Men's Categories";
        }
      }
    });
});

// WOMEN'S CATEGORY

womensBtn.addEventListener("click", function () {
  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((json) => {
      screen.innerHTML = "";
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        // console.log(element);
        const category = element.category.toLowerCase();
        // console.log(category);

        if (category == "women's clothing") {
          womensShow.innerHTML += `<div class="category">
          <div class="item">
          <img src="${element.image}" class="img" />
          <p class="title">${element.title}</p>
          <p class="rating">
          <ion-icon name="star-half-outline"></ion-icon> ${element.rating.rate}
          </p>
          <p class="price">$${element.price}</p>
          <button class="btnOpenModal" onclick="btnOpen(${element.id})"><ion-icon name="add-outline"></ion-icon></button>
          <div id="modal-${element.id}" class="modal">
          <div class="modalOverlay" onclick="modalOver()"></div>
          <div class="modalContent">
          <button class="closeBtn" onclick="btnClose(${element.id})"><span class="material-symbols-outlined">
          close
          </span></button>
          <img src="${element.image}" class="img" />
          <p class="title"> ${element.title}</p>
          <p class="price">$${element.price}</p>
          <div class="qtyDiv">
          <p>Quantity: </p> 
          <div class="qty">
          <button class="minus" onclick="minusBtn(${element.id})"><span class="material-symbols-outlined">
          remove
          </span></button><span><input type="text" id="inputNum-${element.id}" value="1"></span>

          <button class="plus" onclick="plusBtn(${element.id})"><span class="material-symbols-outlined">
          add
          </span></button>
          </div>
          </div>
          <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
          add_shopping_cart
          </span> ADD TO CART  </button>
          </div>
          </div>
          </div>
          </div>`;
          screen.style.display = "none";
          mensShow.style.display = "none";
          electShow.style.display = "none";
          jeweleryShow.style.display = "none";
          womensShow.style.display = "flex";
          updateShow.textContent = "Women's Categories";
        }
      }
    });
});

// JEWERELY CATEGORY

jeweleryBtn.addEventListener("click", function () {
  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((json) => {
      screen.innerHTML = "";
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        // console.log(element);
        const category = element.category.toLowerCase();
        // console.log(category);

        if (category == "jewelery") {
          jeweleryShow.innerHTML += `<div class="category">
          <div class="item">
          <img src="${element.image}" class="img" />
          <p class="title">${element.title}</p>
          <p class="rating">
          <ion-icon name="star-half-outline"></ion-icon> ${element.rating.rate}
          </p>
          <p class="price">$${element.price}</p>
          <button class="btnOpenModal" onclick="btnOpen(${element.id})"><ion-icon name="add-outline"></ion-icon></button>
          <div id="modal-${element.id}" class="modal">
          <div class="modalOverlay" onclick="modalOver()"></div>
          <div class="modalContent">
          <button class="closeBtn" onclick="btnClose(${element.id})"><span class="material-symbols-outlined">
          close
          </span></button>
          <img src="${element.image}" class="img" />
          <p class="title"> ${element.title}</p>
          <p class="price">$${element.price}</p>
          <div class="qtyDiv">
          <p>Quantity: </p> 
          <div class="qty">
          <button class="minus" onclick="minusBtn(${element.id})"><span class="material-symbols-outlined">
          remove
          </span></button><span><input type="text" id="inputNum-${element.id}" value="1"></span>

          <button class="plus" onclick="plusBtn(${element.id})"><span class="material-symbols-outlined">
          add
          </span></button>
          </div>
          </div>
          <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
          add_shopping_cart
          </span> ADD TO CART  </button>
          </div>
          </div>
          </div>
          </div>`;
          screen.style.display = "none";
          mensShow.style.display = "none";
          womensShow.style.display = "none";
          jeweleryShow.style.display = "flex";
          updateShow.textContent = "Jewerely Categories";
        }
      }
    });
});

// ELECTRONICS CATEGORY

electBtn.addEventListener("click", function () {
  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((json) => {
      screen.innerHTML = "";
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        // console.log(element);
        const category = element.category.toLowerCase();
        // console.log(category);

        if (category == "electronics") {
          electShow.innerHTML += `<div class="category">
          <div class="item">
          <img src="${element.image}" class="img" />
          <p class="title">${element.title}</p>
          <p class="rating">
          <ion-icon name="star-half-outline"></ion-icon> ${element.rating.rate}
          </p>
          <p class="price">$${element.price}</p>
          <button class="btnOpenModal" onclick="btnOpen(${element.id})"><ion-icon name="add-outline"></ion-icon></button>
          <div id="modal-${element.id}" class="modal">
          <div class="modalOverlay" onclick="modalOver()"></div>
          <div class="modalContent">
          <button class="closeBtn" onclick="btnClose(${element.id})"><span class="material-symbols-outlined">
          close
          </span></button>
          <img src="${element.image}" class="img" />
          <p class="title"> ${element.title}</p>
          <p class="price">$${element.price}</p>
          <div class="qtyDiv">
          <p>Quantity: </p> 
          <div class="qty">
          <button class="minus" onclick="minusBtn(${element.id})"><span class="material-symbols-outlined">
          remove
          </span></button><span><input type="text" id="inputNum-${element.id}" value="1"></span>

          <button class="plus" onclick="plusBtn(${element.id})"><span class="material-symbols-outlined">
          add
          </span></button>
          </div>
          </div>
          <button class="buyBtn" onclick="buyBtn(${element.id})"><span class="material-symbols-outlined">
          add_shopping_cart
          </span> ADD TO CART  </button>
          </div>
          </div>
          </div>
          </div>`;
          screen.style.display = "none";
          mensShow.style.display = "none";
          jeweleryShow.style.display = "none";
          womensShow.style.display = "none";
          electShow.style.display = "flex";
          updateShow.textContent = "Electronic Categories";
        }
      }
    });
});

// COUNT
function count() {
  let count = document.getElementById("count");
  let cartArr = JSON.parse(localStorage.getItem("item")) || [];
  count.textContent = cartArr.length;
  console.log(cartArr);
}
count();

// UPDATE TOTAL
function updateTotal() {
  let cartTotal = 0;
  let totalBill = document.getElementById("totalBill");
  let gotten = JSON.parse(localStorage.getItem("item"));
  gotten.forEach((element) => {
    console.log(element);
    cartTotal += element.total;
    totalBill.textContent = `$ ${cartTotal}`;
  });
  console.log(cartTotal);
}
updateTotal();
