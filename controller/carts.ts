import Cart from "../models/Cart";
import Product from "../models/Product";
import controller from "./controller";

export const getCart: controller = (req, res, next) => {
  req
    .user!.getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      if (products.length < 1) {
        return res.status(200).render("pages/cart/cart", {
          pageTitle: "Cart",
          cartProducts: products,
          totalPrice: 0,
        });
      }
      res.status(200).render("pages/cart/cart", {
        pageTitle: "Cart",
        cartProducts: products,
        totalPrice: 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postAddProductToCart: controller = (req, res, next) => {
  const { productId } = req.params;
  let fetchedCart: Cart | null = null;
  let newQuantity = 1;
  req
    .user!.getCart()
    .then((userCart) => {
      fetchedCart = userCart;
      return userCart.getProducts({ where: { id: productId } });
    })
    .then((productsInCart) => {
      if (!fetchedCart) throw new Error("");
      if (productsInCart.length > 0) {
        const product = productsInCart[0];
      }
      return Product.findByPk(productId);
    })
    .then((foundedProduct) => {
      if (foundedProduct) {
        fetchedCart!.addProduct(foundedProduct, {
          through: { quantity: newQuantity },
        });
        res.status(200).redirect("/cart");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postRemoveProductFromCart: controller = (req, res, next) => {
  const { productId } = req.params;
  res.status(200).redirect("/cart");
};
