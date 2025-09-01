import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import conexion from '../conexion.mjs';

const router = express.Router();

// arreglamos __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// probamos conexión una vez
conexion.connect((err) => {
    if (!err) {
        console.log("base de datos conectada en cajaiesumamov");
    } else {
        console.log("no se conectó en cajaiesumamov", err);
    }
});

router.get('/', (req, res) => {

    // ruta absoluta al sql, siempre al lado del .mjs
    const sqlPath = join(__dirname, 'sumacajapm.sql');

    fs.readFile(sqlPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo SQL:", err);
            return res.status(500).send("Error leyendo el archivo SQL");
        }
        conexion.query(data, (err, results) => {
            if (err) {
                console.error('Error al ejecutar el script SQL:', err);
                return res.status(500).send("Error al ejecutar SQL");
            }
            res.json(results);
            //      const finalResults = results[results.length - 2];
            //      res.json(finalResults);
            // respondemos al cliente
        });
    });
});

export default router;
