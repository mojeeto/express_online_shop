import dbConnection from "../utils/database";
import {
  WriteFileCallback,
  readFileFromStorage,
  writeFileFromStorage,
} from "../utils/filesystem";

type ProductProperties = {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  description?: string;
};

export default class Product {
  id: number;
  name: string;
  price?: number;
  imageUrl?: string;
  description?: string;

  constructor(options: ProductProperties) {
    this.id = options.id || 0;
    this.name = options.name || "Undefined";
    this.price = options.price || 0;
    this.imageUrl = options.imageUrl || "/images/products/default.png";
    this.description = options.description || "Undefined";
  }

  save() {
    return dbConnection.execute(
      "INSERT INTO products (name, price, imageUrl, description) VALUES (?, ?, ?, ?);",
      [this.name, this.price, this.imageUrl, this.description]
    );
  }

  update(callback: WriteFileCallback) {
    readFileFromStorage("products.json", (err, data) => {
      const products: Product[] = JSON.parse(data.toString());
      products.forEach((product: Product) => {
        if (product.id === this.id) {
          product.name = this.name;
          product.price = this.price;
          product.imageUrl = this.imageUrl;
          product.description = this.description;
        }
      });
      writeFileFromStorage("products.json", JSON.stringify(products), callback);
    });
  }

  static updateById(
    id: number,
    options: ProductProperties,
    callback: WriteFileCallback
  ) {
    const product = new Product({ id, ...options });
    product.update(callback);
  }

  delete(callback: WriteFileCallback) {
    readFileFromStorage("products.json", (err, data) => {
      const products: Product[] = JSON.parse(data.toString());
      const filteredProducts = products.filter(
        (product: Product) => product.id !== this.id
      );
      writeFileFromStorage(
        "products.json",
        JSON.stringify(filteredProducts),
        callback
      );
    });
  }

  static deleteById(id: number, callback: WriteFileCallback) {
    const product = new Product({ id });
    product.delete(callback);
  }

  static findProductById(id: number, callback: (product: Product) => void) {
    readFileFromStorage("products.json", (err, data) => {
      const products: Product[] = JSON.parse(data.toString());
      const product = products.find((product: Product) => product.id === id);
      if (product) callback(product);
      else throw new Error("Product not Found!");
    });
  }

  static fetchAll() {
    return dbConnection.execute("SELECT * FROM products");
  }
}
