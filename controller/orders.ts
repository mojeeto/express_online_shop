import Order from "../models/order";
import controller from "./controller";

export const getOrders: controller = (req, res, next) => {
  Order.find({ userId: req.user!._id })
    .then((orders) => {
      res.render("pages/orders/index", {
        pageTitle: "orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addOrder: controller = (req, res, next) => {
  req
    .user!.populate("cart.products._id")
    .then((user) => {
      const products = user.cart.products.map((product) => {
        return {
          product: product._id["_doc"],
          count: product.count,
        };
      });
      const totalPrice = user.cart.totalPrice;
      const order = new Order({
        products: products,
        totalPrice,
        userId: user._id,
      });
      return order.save();
    })
    .then((result) => req.user!.clearCart())
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};
