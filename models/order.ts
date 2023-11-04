import { Schema, Document, model, PopulatedDoc, SchemaType } from "mongoose";
import { IUser } from "./user";
import { IProduct } from "./product";

type IOrderProductItem = {
  product: IProduct;
  count: number;
};

export interface IOrder extends Document {
  products: IOrderProductItem[];
  userId: PopulatedDoc<IUser & Document>;
  totalPrice: number;
}

const OrderSchema = new Schema<IOrder>({
  products: [
    {
      product: {
        type: Object,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

export default model<IOrder>("Order", OrderSchema);
