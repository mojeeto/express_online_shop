import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../utils/database";
import Product from "./Product";
import Cart from "./Cart";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare forename: string;
  declare surname: string;
  declare age: CreationOptional<number>;
  declare email: string;

  declare createProduct: HasManyCreateAssociationMixin<Product, "userId">;
  declare createCart: HasOneCreateAssociationMixin<Cart>;
  declare getProducts: HasManyGetAssociationsMixin<Product>;
  declare getCart: HasOneGetAssociationMixin<Cart>;
  declare static associations: {
    products: Association<User, Product>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    forename: DataTypes.STRING,
    surname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
  },
  {
    modelName: "user",
    sequelize,
  }
);

export default User;
