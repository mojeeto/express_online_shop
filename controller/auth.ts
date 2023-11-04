import controller from "./controller";
import User from "../models/user";
import { compare, hash } from "bcryptjs";
import crypto from "crypto";
import { validationResult } from "express-validator";

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("pages/auth/login", {
      pageTitle: "Login",
      path: "/auth/login",
      errorMessage: errors.array(),
    });
  }
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

export const getReset: controller = (req, res, next) => {
  res.render("pages/auth/reset", { pageTitle: "Reset Password" });
};

export const postReset: controller = (req, res, next) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/auth/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          req.flash("message", ["error", "Email not found!"]);
          res.redirect("/auth/reset");
        } else {
          user.resetToken = token;
          user.resetTokenExpire = Date.now() + 3600000;
          return user.save();
        }
      })
      .then((user) => {
        req.flash("message", [
          "success",
          `copy this url and use it as reset link: localhost:3000/auth/reset/${token}`,
        ]);
        res.redirect("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getNewPassword: controller = (req, res, next) => {
  const { resetToken } = req.params;
  User.findOne({ resetToken, resetTokenExpire: { $gt: Date.now() } })
    .then((user) => {
      if (!user) return res.redirect("/");
      res.render("pages/auth/reset", {
        pageTitle: "Reset Password",
        userId: user.id,
        resetToken,
      });
    })
    .catch((err) => {
      console.log("err");
    });
};

export const postNewPassword: controller = (req, res, next) => {
  const { resetToken, userId, password } = req.body;
  User.findOne({
    _id: userId,
    resetToken,
    resetTokenExpire: { $gt: Date.now() },
  })
    .then((user) => {
      if (user) {
        hash(password, 12)
          .then((hashedPassword) => {
            user.resetToken = undefined;
            user.resetTokenExpire = undefined;
            user.password = hashedPassword;
            return user.save();
          })
          .then((user) => {
            req.flash("message", ["success", "Password changed!"]);
            res.redirect("/auth/login");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.redirect("/");
      }
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
    });
  } else {
    res.redirect("/");
  }
};

export const postSignup: controller = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("pages/auth/signup", {
      pageTitle: "Signup",
      path: "/auth/signup",
      errorMessage: errors.array(),
    });
  }
  hash(password, 12)
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
