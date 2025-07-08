import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieves existing cart from localStorage
  let cart = getLocalStorage("so-cart");

  // Ensures cart is an array, or reset it
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Adds a new product to cart array
  cart.push(product);

  // Saves updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}

// Add to Cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// listener for Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
