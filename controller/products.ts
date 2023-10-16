import Product from "../model/Product";
import controller from "./controller";

export const getProducts: controller = (req, res, next) => {
  Product.fetchAll((products: object[]) => {
    res.render("index", {
      pageTitle: "Home",
      path: "/",
      products,
    });
  });
};

export const getManageProduct: controller = (req, res, next) => {
  Product.fetchAll((products: object[]) => {
    res.render("pages/admin/products/manage-products", {
      fixTitle: "Manage Product",
      path: "/admin/manage-products",
      products,
    });
  });
};

export const postAddProduct: controller = (req, res, next) => {
  const { productName, productPrice, productDescription } = req.body;
  const product = new Product(productName, +productPrice, productDescription);
  product.save();
  res.status(301).redirect("/admin/manage-products");
};
