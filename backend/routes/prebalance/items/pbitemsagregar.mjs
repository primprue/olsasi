import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

//cambié en la tabla de rubros de PreBalance el indice autoincremental 
router.post("/", async (req, res) => {
    const registro = {
        // PBItemsRubro: parseInt(req.body.PBItemsRubro),
        PBItemsRubro: 1,
        PBItemsSubRubro: parseInt(req.body.PBItemsSubRubro),
        PBItemsFecha: req.body.PBItemsFecha,
        PBItemsTipoComp: req.body.PBItemsTipoComp,
        PBItemsNroComp: req.body.PBItemsNroComp,
        PBItemsProv: parseInt(req.body.PBItemsProv),
        PBItemsImp: parseFloat(req.body.PBItemsImp) || 0,
        PBItemsPorcIVA: parseFloat(req.body.PBItemsPorcIVA) || 0,
        PBItemsIVA: parseFloat(req.body.PBItemsIVA) || 0,
        PBItemsIIBB: parseFloat(req.body.PBItemsIIBB) || 0,
        PBItemsOtros: parseFloat(req.body.PBItemsOtros) || 0,
        PBItemsOtros1: parseFloat(req.body.PBItemsOtros1) || 0,
        PBItemsOtros2: parseFloat(req.body.PBItemsOtros2) || 0,
        PBItemsOtros3: parseFloat(req.body.PBItemsOtros3) || 0,
        PBItemsOtros4: parseFloat(req.body.PBItemsOtros4) || 0,
        PBItemsTotal: parseFloat(req.body.PBItemsTotal) || 0
    };

    try {
        const q = `Insert into BasePreBalance.PBItems SET ?`;
        await conexionpool.query(q, [registro]);

        return res.status(201).json({
            leyenda: 'Items creados correctamente',
        });

    } catch (err) {
        console.error("Error en el proceso:", err);

        // Manejo de errores específicos de SQL
        if (err.errno === 1062) {
            return res.status(460).json({ message: "Clave duplicada" });
        }
        if (err.errno === 1406) {
            return res.status(410).json({ message: "Dato demasiado largo para una columna" });
        }

        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});


export default router;
