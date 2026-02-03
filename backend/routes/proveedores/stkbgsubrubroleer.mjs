import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.get("/", async (req, res) => {
    const q = `SELECT idSubRubro as value, SubRubroDetalle as label FROM BasesGenerales.SubRubros`;

    try {
        const [rows] = await conexionpool.query(q);

        res.json(rows);
    } catch (err) {
        console.error("Error en la DB:", err);
        res.status(500).json({
            error: "Error al obtener los tipos de subrubros",
            details: err.message
        });
    }
});

export default router;