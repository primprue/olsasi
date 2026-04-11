import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.get('/', async (req, res) => {
    try {
        const q = `SELECT idOTEncab  as id, OTEncabCliente, OTEncabClienteNoReg, OTEncabEstado,
    date_format(OTEncabFecha, "%d-%m-%Y") as OTEncabFecha,
    date_format(OTEncabFechaPromesa, "%d-%m-%Y") as OTEncabFechaPromesa, OTEncabImpTotal, OTEncabSenia, OTEncabconIVA, OTEncabTransporte from BasesOrdenes.OTEncab order by idOTEncab desc `;
        const [result] = await conexionpool.query(q);
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