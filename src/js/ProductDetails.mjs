import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        console.log("Loaded Product:", this.product);  // <-- Debug log

        if (this.product) {
            this.renderProductDetails();
            document.getElementById("addToCart")
                .addEventListener("click", this.addToCart.bind(this));
        } else {
            // Handle case where product not found
            const container = document.getElementById("product-detail");
            container.innerHTML = "<p>Sorry, product not found.</p>";
        }
    }

    addToCart() {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alert(`${this.product.Name} added to cart!`);
        setTimeout(() => {
            window.location.reload();
        }, 1500); 
    }

    renderProductDetails() {
        const container = document.getElementById("product-detail");

        // Extract and safely handle fields from product object
        const brandName = this.product.Brand?.Name || "Unknown Brand";
        const image = this.product.Image || "";
        const name = this.product.Name || "Product Name";
        const price = this.product.FinalPrice || "N/A";
        const colorNames = this.product.Colors?.map(color => color.ColorName).join(", ") || "—";
        const description = this.product.DescriptionHtmlSimple || "No description available.";

        container.innerHTML = `
            <section class="product-detail">
                <h3>${brandName}</h3>
                <h2 class="divider">${name}</h2>
                <img
                    class="divider"
                    src="${image}"
                    alt="${name}"
                />
                <p class="product-card__price">$${price}</p>
                <p class="product__color">${colorNames}</p>
                <p class="product__description">
                    ${description}
                </p>
                <div class="product-detail__add">
                    <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
                </div>
            </section>
        `;
    }
}
