import { ObjectId, OptionalId } from "mongodb";
import { _db } from "../utils/database";

export type ProductProperties = {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  _id?: string;
};

// product collection
class Product {
  declare _id: OptionalId<ObjectId>;
  declare title: string;
  declare price: number;
  declare description: string;
  declare imageUrl: string;

  constructor(options: ProductProperties) {
    this.title = options.title;
    this.price = options.price;
    this.description = options.description;
    this.imageUrl = options.imageUrl;
    if (options._id) this._id = new ObjectId(options._id);
  }

  // save method for save intance of new product in db
  // or can be use as update method
  save() {
    if (this._id)
      return _db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    return _db.collection("products").insertOne(this);
  }

  // fetch all products from db
  static fetchAll() {
    return _db.collection("products").find().toArray();
  }

  // fetch one product by ID
  static findById(productId: string) {
    return _db.collection("products").findOne({ _id: new ObjectId(productId) });
  }

  // delete one product by ID
  static deleteById(productId: string) {
    return _db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) });
  }
}

export default Product;
