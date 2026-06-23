import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

//cambié en la tabla de rubros de PreBalance el indice autoincremental 
router.post("/", async (req, rest) => {

    const imp = parseFloat(req.body.PBItemsImp) || 0;
    const porc = parseFloat(req.body.PBItemsPorcIVA) || 0;
    const importeIVA = (imp * porc / 100).toFixed(2);
    const total = imp + parseFloat(importeIVA)
        + parseFloat(req.body.PBItemsIIBB)
        + parseFloat(req.body.PBItemsOtros)
        + parseFloat(req.body.PBItemsOtros1)
        + parseFloat(req.body.PBItemsOtros2)
        + parseFloat(req.body.PBItemsOtros3)
        + parseFloat(req.body.PBItemsOtros4)
        ;

    const PBidItems = parseInt(req.body.PBidItems);
    const PBItemsRubro = parseInt(req.body.PBItemsRubro);
    const PBItemsSubRubro = parseInt(req.body.PBItemsSubRubro);
    const PBItemsFecha = req.body.PBItemsFecha.split('T')[0];
    const PBItemsTipoComp = req.body.PBItemsTipoComp;
    const PBItemsNroComp = req.body.PBItemsNroComp;
    const PBItemsProv = parseInt(req.body.PBItemsProv);
    const PBItemsImp = parseFloat(req.body.PBItemsImp) || 0;
    const PBItemsPorcIVA = parseFloat(req.body.PBItemsPorcIVA) || 0;
    const PBItemsIVA = importeIVA || 0;
    const PBItemsIIBB = parseFloat(req.body.PBItemsIIBB) || 0;
    const PBItemsOtros = parseFloat(req.body.PBItemsOtros) || 0;
    const PBItemsOtros1 = parseFloat(req.body.PBItemsOtros1) || 0;
    const PBItemsOtros2 = parseFloat(req.body.PBItemsOtros2) || 0;
    const PBItemsOtros3 = parseFloat(req.body.PBItemsOtros3) || 0;
    const PBItemsOtros4 = parseFloat(req.body.PBItemsOtros4) || 0;
    const PBItemsTotal = total || 0

    try {
        const q = `Update  BasePreBalance.PBItems SET 
                PBItemsFecha = ?,
                PBItemsTipoComp = ?,
                PBItemsNroComp = ?,
                PBItemsProv = ?,
                PBItemsImp = ?,
                PBItemsPorcIVA = ?,
                PBItemsIVA = ?,
                PBItemsIIBB = ?,
                PBItemsOtros = ?,
                PBItemsOtros1 = ?,
                PBItemsOtros2 = ?,
                PBItemsOtros3 = ?,
                PBItemsOtros4 = ?,
                PBItemsTotal = ?
                where PBidItems = ? and PBItemsRubro= ? and PBItemsSubRubro = ?`;

        await conexionpool.query(q, [PBItemsFecha,
            PBItemsTipoComp,
            PBItemsNroComp,
            PBItemsProv,
            PBItemsImp,
            PBItemsPorcIVA,
            PBItemsIVA,
            PBItemsIIBB,
            PBItemsOtros,
            PBItemsOtros1,
            PBItemsOtros2,
            PBItemsOtros3,
            PBItemsOtros4,
            PBItemsTotal,
            PBidItems, PBItemsRubro, PBItemsSubRubro]);

        return rest.status(200).json({
            leyenda: 'Item modificado correctamente',
        });
    } catch (err) {
        console.error("Error en el proceso:", err);
        // Manejo de errores específicos de SQL
        if (err.errno === 1062) {
            return rest.status(460).json({ message: "Clave duplicada" });
        }
        if (err.errno === 1406) {
            return rest.status(410).json({ message: "Dato demasiado largo para una columna" });
        }
        return rest.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});
export default router;