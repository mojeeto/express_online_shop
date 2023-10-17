import { Router } from "express";
import {
  getManageProduct,
  postAddProduct,
  postUpdateProduct,
} from "../controller/products";

const router = Router();

router.get("/manage-products", getManageProduct);
router.post("/manage-products/add-product", postAddProduct);
router.post("/manage-products/edit-product/:id", postUpdateProduct);

export default router;
