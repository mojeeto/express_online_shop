import * as express from "express";
import User from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user: User | null;
  }
}
