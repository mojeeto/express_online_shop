import { _db } from "../utils/database";
import { ObjectId, OptionalId } from "mongodb";
import Product from "./Product";

type ProductInCartItemType = {
  _id: ObjectId;
  count: number;
};

export type CartItemProperties = {
  products: ProductInCartItemType[];
  quantity: number;
};

export type UserProperties = {
  _id?: string;
  forename: string;
  surname: string;
  age?: number;
  email: string;
  cart?: CartItemProperties;
};

class User {
  declare _id: OptionalId<ObjectId>;
  declare forename: string;
  declare surname: string;
  declare age?: number;
  declare email: string;
  declare cart?: CartItemProperties;

  constructor(options: UserProperties) {
    if (options._id) this._id = new ObjectId(options._id);
    this.forename = options.forename;
    this.surname = options.surname;
    if (options.age) this.age = options.age;
    this.email = options.email;
    this.cart = options.cart;
  }

  save() {
    return _db.collection("users").insertOne(this);
  }

  addToCart(thisProduct: Product) {
    const cart: CartItemProperties = {
      products: [
        {
          _id: thisProduct._id,
          count: 1,
        },
      ],
      quantity: +thisProduct.price,
    };
    // add count and quntity if product exists
    // setup later
    if (this.cart && this.cart.products.length > 0) {
      cart.products = this.cart.products;
      cart.quantity = 0;
      let isProductExists = false;
      cart.products.forEach((product) => {
        if (product._id.equals(thisProduct._id)) {
          product.count += 1;
          isProductExists = true;
        }
        cart.quantity += product.count * thisProduct.price;
      });
      if (!isProductExists) {
        cart.products.push({ _id: thisProduct._id, count: 1 });
        cart.quantity += thisProduct.price;
      }
    }
    cart.quantity = +cart.quantity.toFixed(2);
    // if does not exists any cart item
    _db.collection("users").updateOne({ _id: this._id }, { $set: { cart } });
  }

  static findById(userId: string) {
    return _db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

export default User;
