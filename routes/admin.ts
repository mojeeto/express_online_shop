import { Router } from "express";
import {
  getManageProduct,
  postAddProduct,
  postUpdateProduct,
  getDeleteProduct,
} from "../controller/products";

const router = Router();

// check if admin logged in then request can go to other middlewares
router.use((req, res, next) => {
  if (!req.user) return res.status(401).redirect("/");
  next();
});
router.get("/manage-products", getManageProduct);
router.post("/manage-products/add-product", postAddProduct);
router.post("/manage-products/edit-product/:id", postUpdateProduct);
router.get("/manage-products/delete-product/:id", getDeleteProduct);

export default router;
