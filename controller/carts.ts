import Cart from "../models/Cart";
import Product from "../models/Product";
import controller from "./controller";

export const getCart: controller = (req, res, next) => {
  let totalPrice = 0;
  req
    .user!.getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      products.forEach((product) => {
        //@ts-ignore
        const quantity = product.cartItem.quantity;
        const price = product.price;
        totalPrice += quantity * price;
      });
      res.status(200).render("pages/cart/cart", {
        pageTitle: "Cart",
        cartProducts: products,
        totalPrice,
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
      if (productsInCart.length > 0) {
        const product = productsInCart[0];
        //@ts-ignore
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      fetchedCart!.addProduct(product!, {
        through: { quantity: newQuantity },
      });
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
