import Product from "../models/product";
import controller from "./controller";

export const getProducts: controller = (req, res, next) => {
  Product.findAll()
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

export const getManageProduct: controller = (req, res, next) => {
  Product.findAll()
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

export const postAddProduct: controller = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  Product.create({
    title: productName,
    description: productDescription,
    price: productPrice,
    imageUrl: productImage,
  })
    .then((result) => {
      res.status(301).redirect("/admin/manage-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postUpdateProduct: controller = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const productId = +req.params.id;
  Product.findByPk(productId)
    .then((product) => {
      if (!product) throw new Error("product not found");
      product.title = productName;
      product.price = +productPrice;
      product.description = productDescription;
      product.imageUrl = productImage;
      return product.save();
    })
    .then((result) => {
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDeleteProduct: controller = (req, res, next) => {
  const productId = +req.params.id;
  Product.findByPk(productId)
    .then((product) => product?.destroy())
    .then((result) => {
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      console.log(err);
    });
};
