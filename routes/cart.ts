import { Router } from "express";
import { getCart, postAddProductToCart } from "../controller/carts";

const router = Router();

router.get("/", getCart);
router.post("/add-product/:productId", postAddProductToCart);

export default router;
