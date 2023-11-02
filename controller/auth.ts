import controller from "./controller";

export const getLogin: controller = (req, res, next) => {
  res.render("pages/auth/login", {
    pageTitle: "Login",
    path: "/auth/login",
    isAuthenticated: req.session.isAuthenticated,
  });
};

export const postLogin: controller = (req, res, next) => {
  req.session.isAuthenticated = true;
  res.redirect("/");
};

export const logout: controller = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("you are logged out!");
    res.redirect("/");
  });
};
