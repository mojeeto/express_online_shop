import controller from "./controller";

export const getLogin: controller = (req, res, next) => {
  res.render("pages/auth/login", { pageTitle: "Login", path: "/auth/login" });
};
