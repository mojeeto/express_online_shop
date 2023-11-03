import { Router } from "express";
import {
  getLogin,
  logout,
  postLogin,
  getSignup,
  postSignup,
} from "../controller/auth";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/logout", logout);

export default router;
