import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import authRouter from "./routes/auth";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/user";

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

expressApp.use((req, res, next) => {
  User.findById("65434995e49b9a1e49d1d1fa")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("Error while attach user to Request Object");
    });
});

expressApp.use("/auth", authRouter);
expressApp.use("/admin", adminRouter);
expressApp.use("/cart", cartRouter);
expressApp.use("/orders", orderRouter);
expressApp.use("/", shopRouter);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((resultConnection) => {
    expressApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
