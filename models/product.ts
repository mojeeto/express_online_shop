import { Schema, Model, model } from "mongoose";

export interface IProduct {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductSchema = new Schema<IProduct>({
  title: String,
  price: Number,
  description: String,
  imageUrl: String,
});

export default model<IProduct>("Product", ProductSchema);
