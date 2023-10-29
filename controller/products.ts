import Product from "../models/Product";
import controller from "./controller";

// global
export const getProducts: controller = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("index", {
        pageTitle: "Home",
        path: "/",
        products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// user
export const getManageProduct: controller = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("pages/admin/products/manage-products", {
        fixTitle: "Manage Product",
        path: "/admin/manage-products",
        products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// user
export const postAddProduct: controller = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const newProduct = new Product(
    productName,
    productPrice,
    productDescription,
    productImage
  );
  newProduct
    .save()
    .then(() => {
      res.status(301).redirect("/admin/manage-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// user
export const postUpdateProduct: controller = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const productId = +req.params.id;
  res.status(200).redirect("/admin/manage-products");
};

// user
export const getDeleteProduct: controller = (req, res, next) => {
  const productId = +req.params.id;
  res.status(200).redirect("/admin/manage-products");
};
