import controller from "./controller";
import User from "../models/user";
import { compare, hash } from "bcryptjs";

export const getLogin: controller = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    res.render("pages/auth/login", {
      pageTitle: "Login",
      path: "/auth/login",
    });
  } else {
    res.redirect("/");
  }
};

export const postLogin: controller = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("message", ["error", "Your email or password not correct!"]);
        return res.redirect("/auth/login");
      }
      compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            req.session.isAuthenticated = true;
            req.session.user = user;
            return req.session.save((err) => {
              req.flash("message", ["success", "Welcome!"]);
              res.redirect("/");
            });
          }
          req.flash("message", [
            "error",
            "Your email or password not correct!",
          ]);
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
  if (!req.session.isAuthenticated) {
    res.render("pages/auth/signup", {
      pageTitle: "Signup",
      path: "/auth/signup",
      isAuthenticated: req.session.isAuthenticated,
    });
  } else {
    res.redirect("/");
  }
};

export const postSignup: controller = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return hash(password, 12);
      req.flash("message", ["error", "This email is exists!"]);
      res.redirect("/auth/signup");
    })
    .then((hashedPassword) =>
      new User({ email, password: hashedPassword }).save()
    )
    .then((user) => {
      req.flash("message", [
        "success",
        "Your account successfully created. please to access the website log-in.",
      ]);
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
