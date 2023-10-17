import { readFileFromStorage, writeFileFromStorage } from "../utils/filesystem";

export default class Product {
  id: number;
  name: string;
  price?: number;
  image?: string;
  description?: string;

  constructor(options: {
    id?: number;
    name?: string;
    price?: number;
    image?: string;
    description?: string;
  }) {
    this.id = options.id || 0;
    this.name = options.name || "Undefined";
    this.price = options.price || 0;
    this.image = options.image || "/images/products/default.png";
    this.description = options.description || "Undefined";
  }

  save(callBack: Function) {
    readFileFromStorage("products.json", (data: string) => {
      const products: Product[] = JSON.parse(data);
      this.id = products.length + 1;
      products.push(this);
      writeFileFromStorage("products.json", JSON.stringify(products), callBack);
    });
  }

  update(callback: Function) {
    readFileFromStorage("products.json", (data: string) => {
      const products: Product[] = JSON.parse(data);
      products[this.id - 1] = this;
      this.image = "/images/products/default.png";
      writeFileFromStorage("products.json", JSON.stringify(products), callback);
    });
  }

  static findProductById(id: number, callback: Function) {
    readFileFromStorage("products.json", (data: string) => {
      const products: Product[] = JSON.parse(data);
      const product = products.find((product: Product) => product.id === id);
      if (product) callback(product);
      else throw new Error("Product not Found!");
    });
  }

  static fetchAll(callback: Function) {
    readFileFromStorage("products.json", (data: string) => {
      callback(JSON.parse(data));
    });
  }
}
