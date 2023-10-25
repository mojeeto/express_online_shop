import Cart from "../models/Cart";
import Product from "../models/Product";
import controller from "./controller";

export const getCart: controller = (req, res, next) => {};

export const postAddProductToCart: controller = (req, res, next) => {
  const { productId } = req.params;
  Cart.addProduct(+productId, () => {
    res.status(200).redirect("/cart");
  });
};

export const postRemoveProductFromCart: controller = (req, res, next) => {
  const { productId } = req.params;
  Cart.removeProduct(+productId, () => {
    res.status(200).redirect("/cart");
  });
};
