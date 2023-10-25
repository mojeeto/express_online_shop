import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node_complete", "mojeeto", "", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
