import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.get("/", async (req, res) => {

    const StkRubroAbr = req.query.abr;
    //SET @numero=0;
    try {
        const q1 = `
        Select  @numero:=@numero+1 as id, idStkRubro, StkRubroCodGrp, StkRubroDesc,
        StkItems.idStkItems,  StkGrupo.StkGrupoDesc as GrupoDesc,
        StkItemsDesc, BasesGenerales.Proveedores.ProveedoresDesc,
        StkRubroPresDes, StkRubroAncho, StkRubroPres, StkRubroProv,
        StkItemsMin, StkItemsMax, StkItemsCantidad, StkItemsCantDisp, StkRubroUM,
        date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct
        from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, StkItems,
        (SELECT @numero := 0) AS init
        where StkRubroCodGrp = idStkGrupo
        and StkRubroProv = idProveedores
        and StkRubroTM = idStkMonedas
        and StkRubroCodGrp = idStkGrupo
        and StkItemsRubroAbr = ?
        and StkRubroAbr = ?
        order by StkRubroCodGrp, idStkRubro
        `
        const [result] = await conexionpool.query(q1, [StkRubroAbr, StkRubroAbr]);
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
