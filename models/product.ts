import { Schema, model, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./user";

export const isProduct = (obj: IProduct | any): obj is IProduct => {
  return obj && obj.price && typeof obj.price === "number";
};

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  imagePath?: string;
  userId: PopulatedDoc<IUser & Document>;
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
  imagePath: String,
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default model<IProduct>("Product", ProductSchema);
