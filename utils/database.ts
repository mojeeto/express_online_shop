import mysql from "mysql2";

export default mysql
  .createPool({
    host: "localhost",
    user: "mojeeto",
    password: "",
    database: "node_complete",
  })
  .promise();
