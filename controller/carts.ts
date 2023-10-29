import controller from "./controller";

export const getCart: controller = (req, res, next) => {
  res.status(200).render("pages/cart/cart", {
    pageTitle: "Cart",
    cartProducts: [],
    totalPrice: 0,
  });
};

export const postAddProductToCart: controller = (req, res, next) => {
  const { productId } = req.params;
  res.status(200).redirect("/cart");
};

export const postRemoveProductFromCart: controller = (req, res, next) => {
  const { productId } = req.params;
  res.status(200).redirect("/cart");
};
