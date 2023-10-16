import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(express.static("public"));

expressApp.use("/admin", adminRouter);
expressApp.use(shopRouter);

expressApp.listen(3000);
