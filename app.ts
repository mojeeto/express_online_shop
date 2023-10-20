import express from "express";
import Database from "./utils/database";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use("/admin", adminRouter);
expressApp.use("/cart", cartRouter);
expressApp.use(shopRouter);

Database.execute("SELECT * FROM products")
  .then((data) => {
    console.log(data[0]);
  })
  .catch((err) => {
    console.log(err);
  });

expressApp.listen(3000);
