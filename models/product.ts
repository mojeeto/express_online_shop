import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../utils/database";
import User from "./User";
import CartItem from "./CartItem";
import Cart from "./Cart";

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare price: number;
  declare description: string;
  declare imageUrl: string;

  declare userId: ForeignKey<User["id"]>;
  declare cartItem?: CartItem;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  },
  {
    modelName: "product",
    sequelize,
  }
);

export default Product;
