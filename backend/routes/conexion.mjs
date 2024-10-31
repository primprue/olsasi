import mysql from "mysql";

var conexion = mysql.createConnection({
  // user: "root",
  // host: "192.168.2.11",
  // password: "drasan",
  user: "sandra",
  password: "drasan141",
  host: "localhost",
  database: "BaseStock",
  port: 3306
});

export default conexion;

