import * as session from "express-session";
import { IUser } from "../models/user";

declare module "express-session" {
  interface SessionData {
    isAuthenticated: boolean;
    user: IUser | null;
  }
}
