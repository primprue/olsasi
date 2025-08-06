import express from "express";
var router = express.Router();

import conexion from "../../conexion.mjs";

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos en realizacambiostock");
    } else {
        console.log("no se conecto en realizacambiostock");
    }
});
var datosenvio = [];

router.post("/", function (req, res, next) {
    var datosmodstock = req.body.infingreso
    var d = new Date();
    var finalDate = d.toISOString().split("T")[0];


    var q = ''
    var q1 = ''
    var cambioconf = ''
    datosmodstock[0].cambiatela === 'S' ?
        cambioconf = ' Cambio ' : cambioconf = 'Confirma';

    if (datosmodstock[0].cambiatela === 'S') {
        //modifica disponible y stock de la nueva tela y agrega en el disponible de la anterior
        var q = [" UPDATE BaseStock.StkItems SET ",
            "StkItemsCantidad = StkItemsCantidad - ", datosmodstock[0].tingreso,
            ", StkItemsCantDisp = StkItemsCantDisp - ", datosmodstock[0].tingreso,
            ", StkItemsFAct = '", finalDate,
            "' WHERE (idStkItems = ", datosmodstock[0].indiceitemocambio, ") and  (StkItemsRubroAbr = '", datosmodstock[0].abrevrubrocambio, "')"
        ].join("");


        var q1 = [" UPDATE BaseStock.StkItems SET ",
            "StkItemsCantDisp = StkItemsCantDisp + ", datosmodstock[0].tingreso,
            ", StkItemsFAct = '", finalDate,
            "' WHERE (idStkItems = ", datosmodstock[0].indiceitemo, ") and  (StkItemsRubroAbr = '", datosmodstock[0].abrevrubroo, "')"
        ].join("");

        var q2 = [" INSERT INTO BaseStock.StkMov SET ",
            "StkMovFecha = '", finalDate, "', StkMovTotal = ", datosmodstock[0].tingreso,
            ", StkMovRubroAbr = '", datosmodstock[0].abrevrubroo, "', StkMovItemDesc = '",
            datosmodstock[0].indiceitemo, "', StkMovCliente = '", datosmodstock[0].abrevrubrocambio + " " + cambioconf, "'"
        ].join("");





    }
    else {
        var q1 = [" UPDATE BaseStock.StkItems SET ",
            "StkItemsCantidad = StkItemsCantidad - ", datosmodstock[0].tingreso,
            ", StkItemsFAct = '", finalDate,
            "' WHERE (idStkItems = ", datosmodstock[0].indiceitemo, ") and  (StkItemsRubroAbr = '", datosmodstock[0].abrevrubroo, "')"
        ].join("");
    }
    var q3 = [" INSERT INTO BaseStock.StkMov SET ",
        "StkMovFecha = '", finalDate, "', StkMovTotal = ", datosmodstock[0].tingreso,
        ", StkMovRubroAbr = '", datosmodstock[0].abrevrubrocambio, "', StkMovItemDesc = '",
        datosmodstock[0].indiceitemo, "', StkMovCliente = '", datosmodstock[0].abrevrubrocambio + " " + cambioconf, "'"
    ].join("");

    if (q !== '') {
        conexion.query(q, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                datosenvio.push(result);
            }

            // Ejecutar la segunda consulta después de la primera
            conexion.query(q1, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    datosenvio.push(result);
                }
                conexion.query(q2, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        datosenvio.push(result);
                    }
                    conexion.query(q3, function (err, result) {
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
        });
    } else {
        // Solo ejecutar la segunda consulta
        conexion.query(q1, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                datosenvio.push(result);
            }
            conexion.query(q3, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    datosenvio.push(result);
                }
                res.json(datosenvio);
                datosenvio = [];
            });
        });
    }


});

export default router;
