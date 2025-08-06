import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos en movstockleer");
    } else {
        console.log("no se conecto en movstockleer");
    }
});


router.get("/", function (req, res, next) {

    var q1 = ['SELECT idStkMov as id,  date_format(StkMovFecha, "%d-%m-%Y") as StkMovFecha,   StkMovLargo, StkMovAncho, StkMovTotal, StkMovRubroAbr, StkMovItemDesc, ',
        'StkMovCliente, BasesGenerales.Proveedores.ProveedoresDesc as Proveedor, StkMovNroRef ',
        'from BaseStock.StkMov LEFT JOIN  BasesGenerales.Proveedores ',
        'on StkMovProv = idProveedores ',
        'where StkMovFecha >= \'' + req.query.FechaDesde + '\' and StkMovFecha <= \'' + req.query.FechaHasta + '\''
    ].join(" ");

    conexion.query(q1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

export default router;
