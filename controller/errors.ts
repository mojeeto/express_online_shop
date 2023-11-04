import controller from "./controller";

export const get404: controller = (req, res, next) => {
  res.status(404).render("pages/404", { pageTitle: "Page not found" });
};

export const get500: controller = (req, res, next) => {
  res.status(500).render("pages/500", { pageTitle: "Server Error" });
};
