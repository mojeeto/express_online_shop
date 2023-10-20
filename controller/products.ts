import Product from "../model/Product";
import controller from "./controller";

export const getProducts: controller = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldsData]) => {
      res.render("index", {
        pageTitle: "Home",
        path: "/",
        products: rows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getManageProduct: controller = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldsData]) => {
      res.render("pages/admin/products/manage-products", {
        fixTitle: "Manage Product",
        path: "/admin/manage-products",
        products: rows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postAddProduct: controller = (req, res, next) => {
  const {
    productName: name,
    productPrice: price,
    productDescription: description,
    productImage: imageUrl,
  } = req.body;
  console.log("ok");
  const product = new Product({
    name,
    price,
    description,
    imageUrl,
  });
  product.save(() => {
    res.status(301).redirect("/admin/manage-products");
  });
};

export const postUpdateProduct: controller = (req, res, next) => {
  const {
    productName: name,
    productPrice: price,
    productDescription: description,
    productImage: imageUrl,
  } = req.body;
  const productId = +req.params.id;
  Product.updateById(+productId, { name, price, description, imageUrl }, () => {
    res.status(200).redirect("/admin/manage-products");
  });
};

export const getDeleteProduct: controller = (req, res, next) => {
  const productId = +req.params.id;
  Product.deleteById(productId, () => {
    res.status(200).redirect("/admin/manage-products");
  });
};
