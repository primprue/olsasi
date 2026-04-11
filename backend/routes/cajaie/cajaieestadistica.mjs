import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { conexion } from '../conexion.mjs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req, res) => {
    const { FechaDesde, FechaHasta } = req.query; // "2023-10-01", "2023-10-31"

    const sqlPath = join(__dirname, 'sumacajaestad.sql');

    fs.readFile(sqlPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo SQL:", err);
            return res.status(500).send("Error leyendo el archivo SQL");
        }

        const params = [FechaDesde, FechaHasta];
        conexion.query(data, params, (err, results) => {
            if (err) {
                console.error('Error al ejecutar el script SQL:', err);
                return res.status(500).send("Error al ejecutar SQL");
            }
            res.json(results);
        });
    });
});



export default router;