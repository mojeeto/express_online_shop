import Product from "../models/product";
import controller from "./controller";

export const getProducts: controller = (req, res, next) => {
  res.render("index", {
    pageTitle: "Home",
    path: "/",
    products: [],
  });
};

export const getManageProduct: controller = (req, res, next) => {
  res.render("pages/admin/products/manage-products", {
    fixTitle: "Manage Product",
    path: "/admin/manage-products",
    products: [],
  });
};

export const postAddProduct: controller = (req, res, next) => {
  const {
    productName: name,
    productPrice: price,
    productDescription: description,
    productImage: imageUrl,
  } = req.body;
  res.status(301).redirect("/admin/manage-products");
};

export const postUpdateProduct: controller = (req, res, next) => {
  const {
    productName: name,
    productPrice: price,
    productDescription: description,
    productImage: imageUrl,
  } = req.body;
  const productId = +req.params.id;
  res.status(200).redirect("/admin/manage-products");
};

export const getDeleteProduct: controller = (req, res, next) => {
  const productId = +req.params.id;
  res.status(200).redirect("/admin/manage-products");
};
