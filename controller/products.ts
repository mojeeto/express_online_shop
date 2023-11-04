import controller from "./controller";
import Product from "../models/product";
import { deleteProductImage } from "../utils/filesystem";

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
      next(new Error("Error while get all product"));
    });
};

// user
export const getManageProduct: controller = (req, res, next) => {
  Product.find({ userId: req.user })
    .then((products) => {
      res.render("pages/admin/products/manage-products", {
        fixTitle: "Manage Product",
        path: "/admin/manage-products",
        products,
      });
    })
    .catch((err) => {
      next(new Error("Error while get all product"));
    });
};

// user
export const postAddProduct: controller = (req, res, next) => {
  const { productName, productPrice, productDescription } = req.body;
  const productImage = req.file;
  if (!productImage)
    req.flash("message", ["error", "your type error are not allowed"]);

  const newProduct = new Product({
    title: productName,
    price: productPrice,
    description: productDescription,
    imagePath: productImage ? productImage.path : "",
    userId: req.user,
  });
  newProduct
    .save()
    .then(() => {
      res.status(301).redirect("/admin/manage-products");
    })
    .catch((err) => {
      next(new Error("Error while add product"));
    });
};

// user
export const postUpdateProduct: controller = (req, res, next) => {
  const productId = req.params.id;
  const { productName, productPrice, productDescription } = req.body;
  const productImage = req.file;
  if (!productImage)
    req.flash("message", ["error", "your type error are not allowed"]);
  Product.findByIdAndUpdate(productId)
    .then((product) => {
      product!.title = productName;
      product!.price = productPrice;
      product!.description = productDescription;
      if (productImage) product!.imagePath = productImage.path;
      return product!.save();
    })
    .then((resultOfSave) => {
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
      deleteProductImage(product!.imagePath, (err) => {
        if (err) throw new Error("Error while delete image product");
      });
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      next(new Error("Error while delete product"));
    });
};
