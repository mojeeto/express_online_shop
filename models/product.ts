import { Schema, model, Types, Document } from "mongoose";

export const isProduct = (obj: IProduct | any): obj is IProduct => {
  return obj && obj.price && typeof obj.price === "number";
};

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default model<IProduct>("Product", ProductSchema);
