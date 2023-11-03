import controller from "./controller";
import User from "../models/user";
import { compare, hash } from "bcryptjs";

export const getLogin: controller = (req, res, next) => {
  res.render("pages/auth/login", {
    pageTitle: "Login",
    path: "/auth/login",
    isAuthenticated: req.session.isAuthenticated,
  });
};

export const postLogin: controller = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.redirect("/auth/login");
      compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            req.session.isAuthenticated = true;
            req.session.user = user;
            return req.session.save((err) => res.redirect("/"));
          }
          res.redirect("/auth/login");
        })
        .catch((err) => {
          console.log(err);
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
      if (!user) return hash(password, 12);
      res.redirect("/auth/signup");
    })
    .then((hashedPassword) =>
      new User({ email, password: hashedPassword }).save()
    )
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
