import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { conexion } from '../conexion.mjs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req, res) => {
    let fechaDesde = req.body.fechaDesde;
    let fechaHasta = req.body.fechaHasta;
    //  const { fechaDesde, fechaHasta } = req.query; // "2023-10-01", "2023-10-31"
    console.log('fechaDesde  ', fechaDesde)
    console.log('fechaHasta  ', fechaHasta)

    const sqlPath = join(__dirname, 'sumacajaestad.sql');

    fs.readFile(sqlPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo SQL:", err);
            return res.status(500).send("Error leyendo el archivo SQL");
        }
        // conexion.query(data, [fecha, fecha, fecha, ], (err, results) => {
        // conexion.query(data, (err, results) => {
        const params = [fechaDesde, fechaHasta, fechaDesde, fechaHasta, fechaDesde, fechaHasta];
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