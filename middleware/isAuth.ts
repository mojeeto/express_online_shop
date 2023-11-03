import middleware from "./middleware";

const isAuth: middleware = (req, res, next) => {
  if (!req.session.isAuthenticated) return res.redirect("/auth/login");
  next();
};

export default isAuth;
