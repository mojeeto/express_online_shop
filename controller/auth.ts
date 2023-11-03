import controller from "./controller";
import User from "../models/user";

export const getLogin: controller = (req, res, next) => {
  res.render("pages/auth/login", {
    pageTitle: "Login",
    path: "/auth/login",
    isAuthenticated: req.session.isAuthenticated,
  });
};

export const postLogin: controller = (req, res, next) => {
  User.findById("65434995e49b9a1e49d1d1fa")
    .then((user) => {
      req.session.isAuthenticated = true;
      req.session.user = user;
      req.session.save((err) => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSignup: controller = (req, res, next) => {
  res.render("pages/auth/signup", {
    pageTitle: "Signup",
    path: "/auth/signup",
    isAuthenticated: req.session.isAuthenticated,
  });
};

export const postSignup: controller = (req, res, next) => {
  res.redirect("/");
};

export const logout: controller = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
