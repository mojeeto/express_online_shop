import { Document, InferSchemaType, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

type UserTypeInfer = InferSchemaType<typeof UserSchema>;

export default model<IUser>("User", UserSchema);
