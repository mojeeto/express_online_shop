import { Router } from "express";
import { getLogin, logout, postLogin } from "../controller/auth";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/logout", logout);

export default router;
