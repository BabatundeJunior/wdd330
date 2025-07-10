import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const cartTotalEl = document.querySelector("#cartTotal");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
    cartTotalEl.textContent = ""; // Hide the total
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  productList.innerHTML = htmlItems.join("");

  // Add event listeners to remove buttons
  const removeButtons = productList.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const li = event.target.closest("li.cart-card");
      const indexToRemove = Number(li.dataset.index);
      removeItemFromCart(indexToRemove);
    });
  });

  updateCartTotal(cartItems);
}

function cartItemTemplate(item, index) {
  return ` 
    <li class="cart-card divider" data-index="${index}">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
      </a>
      <button class="remove-item" aria-label="Remove item">&times;</button>
    </li>

  `;
}

function updateCartTotal(cartItems) {
  const cartTotalEl = document.querySelector("#cartTotal");

  if (!cartItems || cartItems.length === 0) {
    cartTotalEl.style.display = "none"; // Hide when cart is empty
    return;
  }

  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  cartTotalEl.style.display = "block"; // Show when items exist
  cartTotalEl.innerHTML = `<span>Total: $${total.toFixed(2)}</span>`;
}

function removeItemFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1); 
    localStorage.setItem("so-cart", JSON.stringify(cartItems)); 
    renderCartContents(); 
  }
  // to refresh window for the cart count to reflect
  window.location.reload();
}

renderCartContents();