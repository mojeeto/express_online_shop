import controller from "./controller";
import Product from "../models/product";

// global
export const getProducts: controller = (req, res, next) => {
  Product.find()
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
  Product.find()
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
  const newProduct = new Product({
    title: productName,
    price: productPrice,
    description: productDescription,
    imageUrl: productImage,
  });
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
  const productId = req.params.id;
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const updatedProduct = new Product({
    title: productName,
    price: productPrice,
    description: productDescription,
    imageUrl: productImage,
    _id: productId,
    userId: req.user!._id,
  });
  updatedProduct
    .save()
    .then(() => {
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// user
export const getDeleteProduct: controller = (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then((product) => {
      console.log("Product Deleted", product);
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      console.log(err);
    });
};
