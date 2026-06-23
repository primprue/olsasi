import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.get("/", async (req, res) => {

    let fechaactual = new Date()
    const anioactual = fechaactual.getFullYear();
    const mesactual = fechaactual.getMonth();
    const diaactual = fechaactual.getDate();
    fechaactual = fechaactual.toLocaleDateString('sv-SE');
    let aniodesde = anioactual - 2
    let fechadesde = new Date(aniodesde, 3, 31);
    fechadesde = fechadesde.toLocaleDateString('sv-SE');
    try {
        const q = `Select concat(PBidItems, PBItemsRubro, PBItemsSubRubro) as id, 
                        concat(  PBItemsSubRubro, PBidItems)  as codsubrubro,
                        PBidItems, PBItemsRubro,  PBItemsSubRubro, PBItemsFecha,
                        PBItemsTipoComp, PBItemsNroComp, PBItemsProv,
                        PBItemsImp, PBItemsPorcIVA, PBItemsIVA, PBItemsIIBB,
                        PBItemsOtros, PBItemsOtros1, PBItemsOtros2, PBItemsOtros3, PBItemsOtros4, PBItemsTotal
                        from BasePreBalance.PBItems where PBItemsFecha between '${fechadesde}' and '${fechaactual}'`;

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

