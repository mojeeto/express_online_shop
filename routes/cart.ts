import { Router } from "express";
import { getCart } from "../controller/carts";

const router = Router();

router.get("/", getCart);

export default router;
