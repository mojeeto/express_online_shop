import { Router } from "express";
import { getProducts } from "../controller/products";

const router = Router();

router.get("/", getProducts);

export default router;
