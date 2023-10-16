import { Router } from "express";
import { getManageProduct, postAddProduct } from "../controller/products";

const router = Router();

router.get("/manage-products", getManageProduct);
router.post("/manage-products/add-product", postAddProduct);

export default router;
