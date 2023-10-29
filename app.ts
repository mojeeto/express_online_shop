import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";
import { MongoConnnet } from "./utils/database";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use("/admin", adminRouter);
expressApp.use("/cart", cartRouter);
expressApp.use("/", shopRouter);

MongoConnnet(() => {
  expressApp.listen(3000);
});
