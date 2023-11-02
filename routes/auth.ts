import { Router } from "express";
import { getLogin, postLogin } from "../controller/auth";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

export default router;
