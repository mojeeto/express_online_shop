import { Router } from "express";
import { getOrders } from "../controller/orders";

const router = Router();

router.get("/", getOrders);

export default router;
