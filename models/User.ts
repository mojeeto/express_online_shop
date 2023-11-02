import { Document, PopulatedDoc, Schema, model } from "mongoose";
import { IProduct } from "./product";

type IUserCartProductItem = {
  _id: PopulatedDoc<IProduct & Document>;
  count: number;
};

type IUserCart = {
  products: IUserCartProductItem[];
  totalPrice: number;
};

export interface IUser extends Document {
  name: string;
  email: string;
  cart: IUserCart;
  addToCart: (product: IProduct) => Promise<IUser>;
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
  cart: {
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
});

UserSchema.methods.addToCart = function (product: IProduct) {
  const cart: IUserCart = {
    products: [{ _id: product._id, count: 1 }],
    totalPrice: product.price,
  };
  if (this.cart.products.length > 0) {
    cart.products = this.cart.products;
    cart.totalPrice = this.cart.totalPrice;
    cart.products.forEach((ep) => {
      if (ep._id.equals(product._id)) ep.count++;
      cart.totalPrice += product.price;
    });
  }
  cart.totalPrice = +cart.totalPrice.toFixed(2);
  this.cart = cart;
  return this.save();
};

export default model<IUser>("User", UserSchema);
