import { Router } from "express";
import {
  getCart,
  postAddProductToCart,
  postRemoveProductFromCart,
} from "../controller/carts";

const router = Router();

router.get("/", getCart);
router.post("/add-product/:productId", postAddProductToCart);
router.post("/remove-product/:productId", postRemoveProductFromCart);

export default router;
