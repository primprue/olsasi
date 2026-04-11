// conexion.js
import 'dotenv/config';
import mysqlCallback from 'mysql2';
import mysqlPromise from 'mysql2/promise';
const CLAVE = process.env.CLAVE_MYSQL;

const config = {
  user: "root",
  password: CLAVE,
  host: "localhost",
  database: "BaseStock",
  port: 3306,
  multipleStatements: true,
};

// La versión vieja para archivos viejos
export const conexion = mysqlCallback.createConnection(config);

// La versión nueva para archivos nuevos
// export const conexionpool = mysqlPromise.createPool(config);

export const conexionpool = mysqlPromise.createPool({
  user: "root",
  password: CLAVE,
  host: "localhost",
  database: "BaseStock",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});