import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../utils/database";

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id?: number;
  declare forename: string;
  declare surname: string;
  declare age?: number;
  declare email: string;
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
