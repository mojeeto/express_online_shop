import { _db } from "../utils/database";
import { ObjectId, OptionalId, WithId } from "mongodb";
import Product from "./Product";

type ProductInCartItemType = {
  _id: ObjectId;
  count: number;
};

export type CartItemProperties = {
  products: ProductInCartItemType[];
  totalPrice: number;
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
      totalPrice: +thisProduct.price,
    };
    // add count and quntity if product exists
    // setup later
    if (this.cart && this.cart.products.length > 0) {
      cart.products = this.cart.products;
      cart.totalPrice = 0;
      let isProductExists = false;
      cart.products.forEach((product) => {
        if (product._id.equals(thisProduct._id)) {
          product.count++;
          isProductExists = true;
        }
        cart.totalPrice += product.count * thisProduct.price;
      });
      if (!isProductExists) {
        cart.products.push({ _id: thisProduct._id, count: 1 });
        cart.totalPrice += thisProduct.price;
      }
    }
    cart.totalPrice = +cart.totalPrice.toFixed(2);
    // if does not exists any cart item
    return _db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart } });
  }

  getCart() {
    const productIdsInUserCart = this.cart!.products.map(
      (product) => product._id
    );
    return _db
      .collection("products")
      .find({ _id: { $in: productIdsInUserCart } })
      .toArray()
      .then((allProducts) => {
        const products = allProducts.map((eachProduct) => {
          const indexOfProductInUserCart = this.cart!.products.findIndex(
            (product) => product._id.equals(eachProduct._id)
          );
          const count = this.cart!.products[indexOfProductInUserCart].count;
          const cost = +eachProduct!.price * count;
          return { ...eachProduct, count, cost: cost.toFixed(2) };
        });
        return {
          products: products,
          totalPrice: this.cart!.totalPrice,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteProductFromCart(targetProduct: Product) {
    const cart = {
      products: this.cart!.products,
      totalPrice: 0,
    };
    const filteredCartProducts = cart.products.filter((product) => {
      if (product._id.equals(targetProduct._id)) {
        product.count--;
        if (!product.count) return false;
      }
      cart.totalPrice += product.count * targetProduct.price;
      return true;
    });
    cart.products = filteredCartProducts;
    cart.totalPrice = +cart.totalPrice.toFixed(2);

    return _db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart } });
  }

  static findById(userId: string) {
    return _db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

export default User;
