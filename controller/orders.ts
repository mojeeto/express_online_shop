import controller from "./controller";

export const getOrders: controller = (req, res, next) => {
  res.render("pages/orders/index", { pageTitle: "orders", path: "/orders" });
};
