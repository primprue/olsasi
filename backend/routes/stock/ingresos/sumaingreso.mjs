import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos en sumaingreso");
    } else {
        console.log("no se conecto en sumaingreso");
    }
});
var datosenvio = [];

router.post("/", function (req, res, next) {
    var infingreso = req.body.infingreso
    var d = new Date();
    var finalDate = d.toISOString().split("T")[0];

    var q = [" UPDATE BaseStock.StkItems SET ",
        "StkItemsCantidad = StkItemsCantidad + ", infingreso[0].tingreso,
        ", StkItemsCantDisp = StkItemsCantDisp + ", infingreso[0].tingreso,
        ", StkItemsFAct = '", finalDate,
        "' WHERE (idStkItems = ", infingreso[0].indiceitem, ") and  (StkItemsRubroAbr = '", infingreso[0].abrevrubro, "')"
    ].join("");

    var q1 = [" Select StkItemsCantidad,  StkItemsCantDisp,  ",
        'date_format(StkItemsFAct, "%d-%m-%Y") as StkItemsFAct ',
        " from BaseStock.StkItems ",
        " WHERE (idStkItems = ", infingreso[0].indiceitem, ") and  (StkItemsRubroAbr = '", infingreso[0].abrevrubro, "')"
    ].join("");


    conexion.query(q, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            datosenvio.push(result);

        }


        conexion.query(q1, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                datosenvio.push(result);
            }
            res.json(datosenvio);
            datosenvio = [];
        });
    });

});

export default router;
