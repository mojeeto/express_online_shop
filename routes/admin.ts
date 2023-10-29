import { Router } from "express";
import {
  getManageProduct,
  postAddProduct,
  postUpdateProduct,
  getDeleteProduct,
} from "../controller/products";

const router = Router();

router.get("/manage-products", getManageProduct);
router.post("/manage-products/add-product", postAddProduct);
router.post("/manage-products/edit-product/:id", postUpdateProduct);
router.get("/manage-products/delete-product/:id", getDeleteProduct);

export default router;
