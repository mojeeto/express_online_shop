import controller from "./controller";

export const getLogin: controller = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("pages/auth/login", { pageTitle: "Login", path: "/auth/login" });
};

export const postLogin: controller = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
