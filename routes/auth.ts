import { Router } from "express";
import {
  getLogin,
  logout,
  postLogin,
  getSignup,
  postSignup,
  getReset,
  postReset,
} from "../controller/auth";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/reset", getReset);
router.post("/reset", postReset);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/logout", isAuth, logout);

export default router;
