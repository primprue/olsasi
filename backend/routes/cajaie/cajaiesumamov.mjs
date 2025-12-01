import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import conexion from '../conexion.mjs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req, res) => {
    //let fecha = req.query.fecha; // viene por ejemplo: "2025-11-05"
    //   console.log('fecha en cajaiesumamov  ', fecha)
    // Limpia si viene con hora o formato raro
    // if (fecha && fecha.includes('T')) {
    //     fecha = fecha.split('T')[0];
    // }

    // console.log('Fecha recibida desde frontend:', fecha);

    const sqlPath = join(__dirname, 'sumacajapm.sql');

    fs.readFile(sqlPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo SQL:", err);
            return res.status(500).send("Error leyendo el archivo SQL");
        }
        // conexion.query(data, [fecha, fecha, fecha], (err, results) => {
        conexion.query(data, (err, results) => {
            if (err) {
                console.error('Error al ejecutar el script SQL:', err);
                return res.status(500).send("Error al ejecutar SQL");
            }
            res.json(results);
        });
    });
});



export default router;
