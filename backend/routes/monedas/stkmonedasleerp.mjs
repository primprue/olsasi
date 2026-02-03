import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.get("/", async (req, res) => {
    const q = `SELECT idStkMonedas as value, StkMonedasDescripcion as label FROM BaseStock.StkMonedas`;
    try {
        const [rows] = await conexionpool.query(q);

        res.json(rows);
    } catch (err) {
        console.error("Error en la DB:", err);
        res.status(500).json({
            error: "Error al obtener los Monedas",
            details: err.message
        });
    }
});
export default router;