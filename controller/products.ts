import Product from "../models/Product";
import controller from "./controller";

// global
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

// user
export const getManageProduct: controller = (req, res, next) => {
  req
    .user!.getProducts()
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
  req
    .user!.createProduct({
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

// user
export const postUpdateProduct: controller = (req, res, next) => {
  const { productName, productPrice, productDescription, productImage } =
    req.body;
  const productId = +req.params.id;
  req
    .user!.getProducts({ where: { id: productId } })
    .then((products) => {
      if (products.length < 1) {
        // show error that this product is not for this user
      }
      const product = products[0];
      product.title = productName;
      product.price = +(+productPrice).toFixed(2);
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

// user
export const getDeleteProduct: controller = (req, res, next) => {
  const productId = +req.params.id;
  req
    .user!.getProducts({ where: { id: productId } })
    .then((products) => {
      if (products.length < 0) {
        // show something that this product is not for this user;
      }
      const product = products[0];
      return product.destroy();
    })
    .then((result) => {
      res.status(200).redirect("/admin/manage-products");
    })
    .catch((err) => {
      console.log(err);
    });
};
