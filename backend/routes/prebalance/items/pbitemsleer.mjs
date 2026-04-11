import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.get("/", async (req, res) => {
    // var q = ["Select concat(PBidItems, PBItemsRubro, PBItemsSubRubro) as id, concat(  PBItemsSubRubro, PBidItems)  as codsubrubro, PBidItems, PBItemsRubro,  PBItemsSubRubro, PBItemsFecha, PBItemsTipoComp, PBItemsNroComp, PBItemsProv, " +
    //     " PBItemsImp, PBItemsPorcIVA, PBItemsIVA, PBItemsIIBB, PBItemsOtros, PBItemsOtros1, PBItemsOtros2, PBItemsOtros3, PBItemsOtros4 " +
    //     "from BasePreBalance.PBItems"].join(" ");
    try {
        const q = `Select concat(PBidItems, PBItemsRubro, PBItemsSubRubro) as id, 
                        concat(  PBItemsSubRubro, PBidItems)  as codsubrubro,
                        PBidItems, PBItemsRubro,  PBItemsSubRubro, PBItemsFecha,
                        PBItemsTipoComp, PBItemsNroComp, PBItemsProv,
                        PBItemsImp, PBItemsPorcIVA, PBItemsIVA, PBItemsIIBB,
                        PBItemsOtros, PBItemsOtros1, PBItemsOtros2, PBItemsOtros3, PBItemsOtros4
                        from BasePreBalance.PBItems`
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

