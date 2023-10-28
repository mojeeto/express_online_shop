import express from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import bodyParser from "body-parser";
import sequelize from "./utils/database";
import Product from "./models/Product";
import User from "./models/User";
import Cart from "./models/Cart";
import CartItem from "./models/CartItem";

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static("public"));

expressApp.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

expressApp.use("/admin", adminRouter);
expressApp.use("/cart", cartRouter);
expressApp.use(shopRouter);

// relation between product and user
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// relation between user and cart, cart and product
Cart.belongsTo(User, { constraints: true });
User.hasOne(Cart);

Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (user) return user;
    return User.create({
      surname: "admin",
      forename: "admin",
      age: 0,
      email: "admin@localhost",
    });
  })
  .then((createdUser) => {
    return createdUser.createCart();
  })
  .then(() => {
    expressApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
