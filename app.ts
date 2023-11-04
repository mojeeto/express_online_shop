import express, { NextFunction, Request, Response } from "express";
import shopRouter from "./routes/shop";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import authRouter from "./routes/auth";
import errorsRouter from "./routes/errors";
import session from "express-session";
import csurf from "csurf";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import multer, { Field, FileFilterCallback } from "multer";
import mongoose from "mongoose";
import User from "./models/user";
import isAuth from "./middleware/isAuth";

const expressApp = express();
const store = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/shop",
  collectionName: "sessions",
});
const storageMulterFile = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images"),
  filename: (req, file, cb) =>
    cb(null, `${new Date().toISOString()}-${file.originalname}`),
});

const filterMulterFile = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype !== "image/png") return cb(null, false);
  cb(null, true);
};

expressApp.set("view engine", "ejs");
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(
  multer({ storage: storageMulterFile, fileFilter: filterMulterFile }).single(
    "productImage"
  )
);
expressApp.use(express.static("public"));
expressApp.use(
  session({
    secret: "this is test long secret key for hashing session id",
    saveUninitialized: false,
    resave: false,
    store,
  })
);
expressApp.use(csurf());

expressApp.use((req, res, next) => {
  if (!req.session.user) return next();
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

expressApp.use(flash());

expressApp.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.message = req.flash("message") || null;
  next();
});

expressApp.use("/auth", authRouter);
expressApp.use("/admin", isAuth, adminRouter);
expressApp.use("/cart", isAuth, cartRouter);
expressApp.use("/orders", isAuth, orderRouter);
expressApp.use("/", shopRouter);
expressApp.use(errorsRouter);

expressApp.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.redirect("/500");
  }
);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((resultConnection) => {
    expressApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
