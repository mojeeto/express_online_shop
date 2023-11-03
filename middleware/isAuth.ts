import middleware from "./middleware";

const isAuth: middleware = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    req.flash("message", ["info", "You need to login to access!"]);
    return res.redirect("/auth/login");
  }
  next();
};

export default isAuth;
