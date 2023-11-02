import Order from "../models/order";
import User from "../models/user";
import controller from "./controller";

export const getOrders: controller = (req, res, next) => {
  res.render("pages/orders/index", { pageTitle: "orders", path: "/orders" });
};

export const addOrder: controller = (req, res, next) => {
  req
    .user!.populate("cart.products._id")
    .then((user) => {
      const products = user.cart.products.map((product) => ({
        product: product._id,
        count: product.count,
      }));
      const totalPrice = user.cart.totalPrice;
      const order = new Order({
        products: products,
        totalPrice,
        userId: user._id,
      });
      return order.save();
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log(err);
    });
};
