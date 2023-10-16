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

export const getAddProduct: controller = (req, res, next) => {
  Product.fetchAll((products: object[]) => {
    res.render("pages/admin/products/manage-products", {
      fixTitle: "Manage Product",
      path: "/admin/manage-products",
      products,
    });
  });
};
