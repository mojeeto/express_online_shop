import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import bodyParser from "body-parser";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use("/admin", adminRouter);
expressApp.use(shopRouter);

expressApp.listen(3000);
