import { Router } from "express";
import { getOrders, addOrder, getInvoicePdf } from "../controller/orders";

const router = Router();

router.post("/:userId", addOrder);
router.get("/", getOrders);

router.get("/invoice/:orderId", getInvoicePdf);

export default router;
