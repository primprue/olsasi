import express from "express";
var router = express.Router();
import path from "path";
import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos en leedatosingreso");
    } else {
        console.log("no se conecto en leedatosingreso");
    }
});


router.get("/", function (req, res, next) {
    // router.get("/", async function (req, res, next) {
    var q = ["SET @numero=0 "].join(" ");
    conexion.query(q, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
    var StkRubroAbr = req.query.abr;
    var q = [
        'Select  @numero:=@numero+1 as id, idStkRubro, StkRubroCodGrp, StkRubroDesc, StkItems.idStkItems,  StkGrupo.StkGrupoDesc as GrupoDesc, ',
        'StkItemsDesc, BasesGenerales.Proveedores.ProveedoresDesc, StkRubroPresDes, StkRubroAncho, StkRubroPres, ',
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
        // "Select * from StkItems where StkItemsRubroAbr = '" + StkRubroAbr + "'",

    ].join(" ");
    conexion.query(q, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

export default router;
