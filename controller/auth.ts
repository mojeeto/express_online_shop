import controller from "./controller";

export const getLogin: controller = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("pages/auth/login", { pageTitle: "Login", path: "/auth/login" });
};

export const postLogin: controller = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

export const logout: controller = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("you are logged out!");
    res.redirect("/");
  });
};
