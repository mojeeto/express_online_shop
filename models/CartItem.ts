import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../utils/database";
import Cart from "./Cart";
import Product from "./Product";

class CartItem extends Model<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  declare id: number;
  declare quantity: number;
  declare cartId: ForeignKey<Cart["id"]>;
  declare productId: ForeignKey<Product["id"]>;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    modelName: "cartItem",
    sequelize,
  }
);

export default CartItem;
