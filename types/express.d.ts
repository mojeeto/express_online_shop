import * as express from "express";
import { Document } from "mongodb";

declare module "express-serve-static-core" {
  interface Request {
    user: Document | null;
  }
}
