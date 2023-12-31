import Product, { IProduct, isProduct } from "../models/product";
import controller from "./controller";

export const getCart: controller = (req, res, next) => {
  req
    .user!.populate("cart.products._id")
    .then((user) => {
      const products = user.cart.products.map((product) => {
        if (isProduct(product._id)) {
          return {
            ...product._id,
            count: product.count,
            cost: +(product._id.price * product.count).toFixed(2),
          };
        }
      });
      res.status(200).render("pages/cart/cart", {
        pageTitle: "Cart",
        cartProducts: { products, userId: req.user!._id },
        totalPrice: user.cart.totalPrice,
        isAuthenticated: req.session.isAuthenticated,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const postAddProductToCart: controller = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      return req.user!.addToCart(product!);
    })
    .then((user) => {
      res.status(200).redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postRemoveProductFromCart: controller = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      return req.user!.removeFromCart(product!);
    })
    .then((user) => {
      res.status(200).redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
