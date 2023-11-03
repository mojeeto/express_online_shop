import { Router } from "express";
import {
  getLogin,
  logout,
  postLogin,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
} from "../controller/auth";
import isAuth from "../middleware/isAuth";
import { body, check } from "express-validator";
import User from "../models/user";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/reset", getReset);
router.post("/reset", postReset);
router.get("/reset/:resetToken", getNewPassword);
router.post("/new-password", postNewPassword);

router.get("/signup", getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) return Promise.reject("This email is exists!");
        });
      }),
    body(
      "password",
      "please enter password with length 5 or more also just user number and character."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmpassword").custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Password not matches!");
      return true;
    }),
  ],
  postSignup
);

router.get("/logout", isAuth, logout);

export default router;
