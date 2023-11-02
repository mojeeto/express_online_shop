import * as express from "express";
import { IUser } from "../models/user";

declare module "express-serve-static-core" {
  interface Request {
    user: IUser | null;
  }
}
