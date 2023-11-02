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
  removeFromCart: (product: IProduct) => Promise<IUser>;
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
    const indexOfProductFounded = cart.products.findIndex((p) =>
      p._id.equals(product._id)
    );
    if (indexOfProductFounded !== -1)
      cart.products[indexOfProductFounded].count++;
    else cart.products.push({ _id: product._id, count: 1 });
    cart.totalPrice += product.price;
  }
  cart.totalPrice = +cart.totalPrice.toFixed(2);
  this.cart = cart;
  return this.save();
};

UserSchema.methods.removeFromCart = function (product: IProduct) {
  const cart: IUserCart = this.cart;
  cart.products = cart.products.filter((p) => {
    if (p._id.equals(product._id)) {
      p.count -= 1;
      cart.totalPrice -= product.price;
      if (!p.count) return false;
    }
    return true;
  });
  cart.totalPrice = +cart.totalPrice.toFixed(2);
  this.cart = cart;
  return this.save();
};

export default model<IUser>("User", UserSchema);
