import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/user";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use((req, res, next) => {
  User.findById("654338af297621da0c17c8b8")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("Error while attach user to Request Object");
    });
});

expressApp.use("/admin", adminRouter);
expressApp.use("/cart", cartRouter);
expressApp.use("/", shopRouter);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((resultConnection) => {
    expressApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
