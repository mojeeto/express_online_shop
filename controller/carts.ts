import controller from "./controller";

export const getCart: controller = (req, res, next) => {
  res.render("pages/cart/cart", { path: "/cart", pageTitle: "Cart" });
};
