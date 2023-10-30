import Product from "../models/Product";
import controller from "./controller";

export const getCart: controller = (req, res, next) => {
  req
    .user!.getCart()
    .then((cart) => {
      res.status(200).render("pages/cart/cart", {
        pageTitle: "Cart",
        cartProducts: cart!.products,
        totalPrice: cart!.totalPrice,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postAddProductToCart: controller = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      const targetProduct = new Product({
        _id: productId,
        title: product!.title,
        price: product!.price,
        description: product!.description,
        imageUrl: product!.imageUrl,
      });
      req.user?.addToCart(targetProduct);
      res.status(200).redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postRemoveProductFromCart: controller = (req, res, next) => {
  const { productId } = req.params;
  res.status(200).redirect("/cart");
};
