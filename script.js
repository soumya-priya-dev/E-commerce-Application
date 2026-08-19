let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(name, price) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

/* BUY NOW */
function buyNow(name, price) {
  localStorage.setItem("buyNowItem", JSON.stringify({ name, price }));
  window.location.href = "checkout.html";
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

/* UPDATE CART PAGE */
function updateCart() {
  let box = document.getElementById("cartItems");
  let totalBox = document.getElementById("total");

  if (box) {
    box.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
      total += item.price;

      box.innerHTML += `
        <div>
          ${item.name} - ₹${item.price}
          <button onclick="removeItem(${i})">Remove</button>
        </div>
      `;
    });

    totalBox.innerText = "Total: ₹" + total;
  }

  let count = document.getElementById("cartCount");
  if (count) count.innerText = cart.length;
}

/* CHECKOUT LOAD */
function loadCheckout() {
  let item = JSON.parse(localStorage.getItem("buyNowItem"));

  if (item) {
    document.getElementById("checkoutBox").innerHTML =
      item.name + " - ₹" + item.price;

    document.getElementById("checkoutTotal").innerText = item.price;
  }
}

/* PLACE ORDER */
function placeOrder() {
  alert("Order Placed Successfully 🎉");

  localStorage.clear();

  window.location.href = "index.html";
}

/* PAGE LOAD */
window.onload = function () {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCart();
  loadCheckout();
};

function logout() {
  localStorage.removeItem("user");

  alert("Logged out successfully!");

  window.location.href = "login.html";
}
function showSelected() {
  let items = document.querySelectorAll(".item");
  let result = document.getElementById("result");

  let selected = [];

  items.forEach(item => {
    if (item.checked) {
      let name = item.getAttribute("data-name");
      let price = item.getAttribute("data-price");

      selected.push(`${name} - ₹${price}`);
    }
  });

  if (selected.length === 0) {
    result.innerHTML = "No items selected";
  } else {
    result.innerHTML = "<h3>Selected Items:</h3>" + selected.join("<br>");
  }
}

// Toggle dropdown open/close
function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}

// Close dropdown if clicked outside
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdown = document.getElementById("dropdownMenu");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
};

// Logout function (if you use login system)
function logout() {
  localStorage.removeItem("user");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}


fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {

    let container = document.getElementById("productContainer");

    products.forEach(product => {

      let price = Math.round(product.price * 80); // 

      container.innerHTML += `
        <div class="product">

          <img src="${product.image}" width="150">

          <h3>${product.title}</h3>

          <p>₹${price}</p>
     
       <button onclick='addToCart(${JSON.stringify(product.title)}, ${price})'>
         Add to Cart
    </button>

      <button class="buyBtn"
      data-name="${product.title}"
      data-price="${price}">
   Buy Now
 </button>
          
        </div>
      `;
    });

  });

document.addEventListener("click", function(e) {

  const btn = e.target.closest(".buyBtn"); 

  if (!btn) return;

  const name = btn.getAttribute("data-name");
  const price = Number(btn.getAttribute("data-price"));

  buyNow(name, price);
});

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
 });
 
