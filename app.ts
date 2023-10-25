import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";
import sequelize from "./utils/database";
import Product from "./models/product";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use("/admin", adminRouter);
expressApp.use("/cart", cartRouter);
expressApp.use(shopRouter);

sequelize
  .sync()
  .then((res) => {
    Product.sync();
    expressApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
