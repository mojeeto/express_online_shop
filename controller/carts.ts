import Cart from "../model/Cart";
import Product from "../model/Product";
import controller from "./controller";

export const getCart: controller = (req, res, next) => {
  Cart.getCartItems((cart) => {
    Product.fetchAll((products) => {
      const cartProducts: object[] = [];
      cart.products.forEach((cartProduct) => {
        products.forEach((product) => {
          if (cartProduct.id === product.id) {
            cartProducts.push({
              ...cartProduct,
              ...product,
            });
          }
        });
      });
      res.render("pages/cart/cart", {
        path: "/cart",
        pageTitle: "Cart",
        cartProducts,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

export const postAddProductToCart: controller = (req, res, next) => {
  const { productId } = req.params;
  Cart.addProduct(+productId, () => {
    res.status(200).redirect("/cart");
  });
};
