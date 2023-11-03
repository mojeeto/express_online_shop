import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import authRouter from "./routes/auth";
import session from "express-session";
import csurf from "csurf";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/user";
import isAuth from "./middleware/isAuth";

const expressApp = express();
const store = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/shop",
  collectionName: "sessions",
});

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));
expressApp.use(
  session({
    secret: "this is test long secret key for hashing session id",
    saveUninitialized: false,
    resave: false,
    store,
  })
);
expressApp.use(csurf());

expressApp.use((req, res, next) => {
  if (!req.session.user) return next();
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

expressApp.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isAuthenticated;
  next();
});

expressApp.use("/auth", authRouter);
expressApp.use("/admin", isAuth, adminRouter);
expressApp.use("/cart", isAuth, cartRouter);
expressApp.use("/orders", isAuth, orderRouter);
expressApp.use("/", shopRouter);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((resultConnection) => {
    expressApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
