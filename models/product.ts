import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../utils/database";

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id?: number;
  declare title: string;
  declare price: number;
  declare description: string;
  declare imageUrl: string;
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
