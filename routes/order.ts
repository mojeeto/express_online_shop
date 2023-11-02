import { Router } from "express";
import { getOrders, addOrder } from "../controller/orders";

const router = Router();

router.post("/:userId", addOrder);
router.get("/", getOrders);

export default router;
