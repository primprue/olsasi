// import mysql from "mysql";

// var conexion = mysql.createConnection({
//   // user: "root",
//   // host: "192.168.2.11",
//   // password: "drasan",
//   user: "sandra",
//   password: "drasan141",
//   host: "localhost",
//   database: "BaseStock",
//   port: 3306,
//   multipleStatements: true,
// });

// export default conexion;

import mysql from 'mysql2';

const conexion = mysql.createConnection({

  user: "root",
  password: "drasan141",
  host: "localhost",

  // user: "root",
  // host: "192.168.2.11",
  // password: "drasan",
  database: "BaseStock",
  port: 3306,
  multipleStatements: true,

});

conexion.connect((err) => {

  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

export default conexion;
