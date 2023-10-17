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
  Product.fetchAll((products: Product[]) => {
    res.render("pages/admin/products/manage-products", {
      fixTitle: "Manage Product",
      path: "/admin/manage-products",
      products,
    });
  });
};

export const postAddProduct: controller = (req, res, next) => {
  const {
    productName: name,
    productPrice: price,
    productDescription: description,
  } = req.body;
  const product = new Product({ name, price, description });
  product.save(() => {
    res.status(301).redirect("/admin/manage-products");
  });
};

export const postUpdateProduct: controller = (req, res, next) => {
  const {
    productName: name,
    productPrice: price,
    productDescription: description,
  } = req.body;
  const productId = +req.params.id;
  Product.findProductById(+productId, () => {
    const product = new Product({ id: productId, name, price, description });
    product.update(() => {
      res.status(200).redirect("/admin/manage-products");
    });
  });
};
