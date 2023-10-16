import { readFileFromStorage, writeFileFromStorage } from "../utils/filesystem";

export default class Product {
  id: number;
  name: string;
  price?: number;
  image?: string;
  description?: string;

  constructor(
    name: string,
    price?: number,
    image?: string,
    description?: string
  ) {
    this.id = 0;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  save() {
    readFileFromStorage("products.json", (data: string) => {
      let products = JSON.parse(data);
      this.id = products.length + 1;
      products.push(this);
      writeFileFromStorage("products.json", JSON.stringify(products));
    });
  }

  static fetchAll(callback: Function) {
    readFileFromStorage("products.json", (data: string) => {
      callback(JSON.parse(data));
    });
  }
}
