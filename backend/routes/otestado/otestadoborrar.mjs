import express from 'express';
var router = express.Router();


import { conexionpool } from '../conexion.mjs';



router.delete("/", async (req, res) => {
    const indice = req.query.id;
    const q = `Delete from  BasesOrdenes.OTEstado where idOTEstado = ?`;
    await conexionpool.query(q, [indice]);
    return res.status(200).json({
        leyenda: "OTEstado borrado correctamente",
    });
});

export default router;
