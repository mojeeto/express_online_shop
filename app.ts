import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use((req, res, next) => {
  next();
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
