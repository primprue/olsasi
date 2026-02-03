import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';

router.get("/", function (req, res, next) {
    // var q = ["SET @numero=0 "].join(" ");
    // conexion.query(q, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
    var StkRubroAbr = req.query.abr;
    var q1 = [
        'SET @numero=0; ',
        'Select  @numero:=@numero+1 as id, idStkRubro, StkRubroCodGrp, StkRubroDesc, StkItems.idStkItems,  StkGrupo.StkGrupoDesc as GrupoDesc, ',
        'StkItemsDesc, BasesGenerales.Proveedores.ProveedoresDesc, StkRubroPresDes, StkRubroAncho, StkRubroPres, StkRubroProv, ',
        'StkItemsMin, StkItemsMax, StkItemsCantidad, StkItemsCantDisp, StkRubroUM, ',
        'date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct ',
        'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, StkItems ',
        'where StkRubroCodGrp = idStkGrupo ',
        'and StkRubroProv = idProveedores ',
        'and StkRubroTM = idStkMonedas ',
        'and StkRubroCodGrp = idStkGrupo ',
        "and StkItemsRubroAbr = '" + StkRubroAbr + "'",
        "and StkRubroAbr = '" + StkRubroAbr + "'",
        'order by StkRubroCodGrp, idStkRubro ',

    ].join(" ");
    conexion.query(q1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result[1]);
        }
    });
});

export default router;
