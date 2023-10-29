import { _db } from "../utils/database";

// product collection
class Product {
  declare id?: number;
  declare title: string;
  declare price: number;
  declare description: string;
  declare imageUrl: string;

  constructor(
    title: string,
    price: number,
    description: string,
    imageUrl: string
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  // save method for save intance of new product in db
  save() {
    return _db.collection("products").insertOne(this);
  }

  // fetch all products from db
  static fetchAll() {
    return _db.collection("products").find().toArray();
  }
}

export default Product;
