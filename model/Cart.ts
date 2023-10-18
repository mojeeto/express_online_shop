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
  static addProduct(productId: number, callback: WriteFileCallback) {
    readFileFromStorage("cart.json", (err, data) => {
      const cart: CartProperty = JSON.parse(data.toString());
      Product.findProductById(productId, (product) => {
        const productIndex = cart.products.findIndex(
          (product) => product.id === productId
        );
        if (productIndex !== -1) {
          cart.products[productIndex].count++;
        } else if (product.price) {
          cart.products.push({
            id: product.id,
            price: product.price,
            count: 1,
          });
        }
        cart.totalPrice = +product.price! + +cart.totalPrice.toFixed(2);
        writeFileFromStorage("cart.json", JSON.stringify(cart), callback);
      });
    });
  }

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
