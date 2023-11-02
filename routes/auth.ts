import { Router } from "express";
import { getLogin } from "../controller/auth";

const router = Router();

router.get("/login", getLogin);

export default router;
