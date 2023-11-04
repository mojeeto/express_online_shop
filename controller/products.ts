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
  Product.findByIdAndUpdate(productId)
    .then((product) => {
      product!.title = productName;
      product!.price = productPrice;
      product!.description = productDescription;
      product!.imagePath = productImage ? productImage.path : "";
      product!.userId = req.user!.id;
      return product!.save();
    })
    .then((resultOfSave) => {
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      next(new Error("Error while update product"));
    });
};

// user
export const getDeleteProduct: controller = (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then((product) => {
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      next(new Error("Error while delete product"));
    });
};
