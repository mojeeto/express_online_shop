import {
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../utils/database";
import User from "./User";
import Product from "./Product";

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  declare id: number;
  declare userId: ForeignKey<User["id"]>;

  declare getProducts: BelongsToManyGetAssociationsMixin<Product[]>;
  declare addProduct: BelongsToManyCreateAssociationMixin<Product>;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    modelName: "cart",
    sequelize,
  }
);

export default Cart;
