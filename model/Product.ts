import { readFileFromStorage } from "../utils/filesystem";

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
  static fetchAll(callback: Function) {
    readFileFromStorage("products.json", (data: string) => {
      callback(JSON.parse(data));
    });
  }
}
