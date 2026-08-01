import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';

router.get('/', async function (req, res) {
    const indice = req.query.id;
    const q = `SELECT 
    MAX(NroOrdenTrabajoMC) as NroMayorOT,
    NroClienteMC
    FROM medidasclientes.datosordenesmc where NroClienteMC =
    (SELECT NumeroClienteDC FROM medidasclientes.datosclientesdc where NroClienteFacDC = ?)
    GROUP BY NroClienteMC`;
    try {
        const [result] = await conexionpool.query(q, [indice]);
        return res.json(result);
    } catch (err) {
        console.error("Error en el proceso:", err);
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});

export default router;