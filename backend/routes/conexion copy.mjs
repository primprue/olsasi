/* esto estaba usando antes de hacer el pool para evitar el queryAsync
import mysql from 'mysql2';

const conexion = mysql.createConnection({

  user: "root",
    password: "drasan141",
  host: "localhost",
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

hasta acá
*/

// conexion.mjs
import mysql from 'mysql2/promise';

// Creamos un pool de conexiones (más eficiente para apps web)
const conexion = mysql.createPool({
  user: "root",
  password: "drasan141",
  host: "localhost",
  database: "BaseStock",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default conexion;







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









// user: "root",
// host: "192.168.2.108",
// password: "drasan141",

// user: "root",
// host: "192.168.2.11",
// password: "drasan",