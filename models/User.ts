import { InferSchemaType, Schema, model } from "mongoose";

const UserSchema = new Schema({
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

export default model<UserTypeInfer>("User", UserSchema);
