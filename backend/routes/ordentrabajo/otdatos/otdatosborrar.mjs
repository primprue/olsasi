import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.delete("/", async (req, res) => {
    var indice = req.query.id;

    const q = `Delete from BasesOrdenes.OTDatos where idOTDatos = ?`;
    await conexionpool.query(q, [indice]);

    return res.status(200).json({
        leyenda: "OTDatos borrada correctamente",
    });
});

export default router;
