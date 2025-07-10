import tents from "../json/tents.js";

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    // Just return the imported array
    return tents;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find(item => item.Id.toLowerCase() === id.toLowerCase());
  }
}
