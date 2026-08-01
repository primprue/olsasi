import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';

router.get('/', async function (req, res) {
    const indice = req.query.id;
    const q = `SELECT 
    concat (NroClienteMC,NroOrdenTrabajoMC,FrenteDorsoMC) as id,
    NroClienteMC,
    NroOrdenTrabajoMC,
    FechaMedidaMC, DetalleMC , FrenteDorsoMC, PatenteMC , IdentificacionMC,
    CONCAT(FrenteDorsoMC, LPAD(NroClienteMC, 4, '0'),LPAD(NroOrdenTrabajoMC, 4, '0'),'.jpg') AS NombreArchivo
     FROM medidasclientes.datosordenesmc where NroClienteMC =
(SELECT NumeroClienteDC FROM medidasclientes.datosclientesdc where NroClienteFacDC = ?)`;
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