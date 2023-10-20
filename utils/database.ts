import mysql from "mysql2";

const dbConnection = mysql
  .createPool({
    host: "localhost",
    user: "mojeeto",
    password: "",
    database: "node_complete",
  })
  .promise();

export default dbConnection;
