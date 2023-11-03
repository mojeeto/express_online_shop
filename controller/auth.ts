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
  const { email, password } = req.body;
  User.findOne({ email, password })
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
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const newUser = new User({ email, password });
        return newUser.save();
      }
      res.redirect("/auth/signup");
    })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout: controller = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
