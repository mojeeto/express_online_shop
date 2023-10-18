import { readFileFromStorage, writeFileFromStorage } from "../utils/filesystem";

type ProductProperties = {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
};

export default class Product {
  id: number;
  name: string;
  price?: number;
  image?: string;
  description?: string;

  constructor(options: ProductProperties) {
    this.id = options.id || 0;
    this.name = options.name || "Undefined";
    this.price = options.price || 0;
    this.image = options.image || "/images/products/default.png";
    this.description = options.description || "Undefined";
  }

  save(callBack: Function) {
    readFileFromStorage("products.json", (data: string) => {
      const products: Product[] = JSON.parse(data);
      if (products.length > 0) {
        this.id = products.at(-1)!.id + 1;
      }
      products.push(this);
      writeFileFromStorage("products.json", JSON.stringify(products), callBack);
    });
  }

  update(callback: Function) {
    readFileFromStorage("products.json", (data: string) => {
      const products: Product[] = JSON.parse(data);
      this.image = "/images/products/default.png";
      products.forEach((product: Product) => {
        if (product.id === this.id) {
          product.name = this.name;
          product.price = this.price;
          product.image = this.image;
          product.description = this.description;
        }
      });
      writeFileFromStorage("products.json", JSON.stringify(products), callback);
    });
  }

  static updateById(
    id: number,
    options: ProductProperties,
    callback: Function
  ) {
    const product = new Product({ id, ...options });
    console.log(options);
    product.update(callback);
  }

  delete(callback: Function) {
    readFileFromStorage("products.json", (data: string) => {
      const products: Product[] = JSON.parse(data);
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

  static deleteById(id: number, callback: Function) {
    const product = new Product({ id });
    product.delete(callback);
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
