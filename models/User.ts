import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: String,
});

export default model<IUser>("User", UserSchema);
