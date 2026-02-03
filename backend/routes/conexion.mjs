// conexion.js
import mysqlCallback from 'mysql2';
import mysqlPromise from 'mysql2/promise';

const config = {

  user: "root",
  password: "drasan141",
  host: "localhost",
  database: "BaseStock",
  port: 3306,
  multipleStatements: true,
};

// La versión vieja para archivos viejos
export const conexion = mysqlCallback.createConnection(config);

// La versión nueva para archivos nuevos
export const conexionpool = mysqlPromise.createPool(config);