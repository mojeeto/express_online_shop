import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";
import MongoConnect from "./utils/database";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use((req, res, next) => {
  res.send("<h1>Hello, World</h1>");
});

// expressApp.use("/admin", adminRouter);
// expressApp.use("/cart", cartRouter);
// expressApp.use(shopRouter);

MongoConnect()
  .then((result) => {
    console.log(result);
    expressApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
    process.abort();
  });
