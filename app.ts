import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";
import { MongoConnnet } from "./utils/database";
import User from "./models/User";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use((req, res, next) => {
  if (!req.user)
    User.findById("653f529e4bcf2aef5188fb59")
      .then((user) => {
        req.user = new User({
          _id: "653f529e4bcf2aef5188fb59",
          email: user!.email,
          forename: user!.forename,
          surname: user!.surname,
          age: user!.age,
          cart: user!.cart,
        });
        next();
      })
      .catch((err) => {
        console.log(err);
      });
});

expressApp.use("/admin", adminRouter);
expressApp.use("/cart", cartRouter);
expressApp.use("/", shopRouter);

MongoConnnet(() => {
  expressApp.listen(3000);
});
