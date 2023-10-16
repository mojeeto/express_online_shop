import { Router } from "express";
import { getAddProduct } from "../controller/products";

const router = Router();

router.get("/manage-products", getAddProduct);
router.post("/add-product", () => {});

export default router;
