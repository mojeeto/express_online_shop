import {
  WriteFileCallback,
  readFileFromStorage,
  writeFileFromStorage,
} from "../utils/filesystem";
import Product from "./Product";

type ProductCart = {
  id: number;
  price: number;
  count: number;
};
type CartProperty = {
  products: ProductCart[];
  totalPrice: number;
};
export default class Cart {
  static addProduct(productId: number, callback: WriteFileCallback) {}

  static removeProduct(productId: number, callback: WriteFileCallback) {
    readFileFromStorage("cart.json", (err, data) => {
      const cart: CartProperty = JSON.parse(data.toString());
      cart.products = cart.products.filter((cartProduct) => {
        if (cartProduct.id !== productId) return true;
        cartProduct.count--;
        cart.totalPrice = +cart.totalPrice.toFixed(2) - +cartProduct.price;
        if (cartProduct.count === 0) return false;
        return true;
      });
      writeFileFromStorage("cart.json", JSON.stringify(cart), callback);
    });
  }

  static getCartItems(callback: (items: CartProperty) => void) {
    readFileFromStorage("cart.json", (err, data) => {
      const cart: CartProperty = JSON.parse(data.toString());
      callback(cart);
    });
  }
}
