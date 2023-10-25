import { DataTypes } from "sequelize";
import sequelize from "../utils/database";

const Product = sequelize.define("product", {
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
});

export default Product;
