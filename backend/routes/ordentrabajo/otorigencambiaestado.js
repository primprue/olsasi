var express = require('express');
var router = express.Router();
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otorigencambiaestado");
    } else {
        console.log("no se conecto en otorigencambiaestado");
    }
});

router.post('/?:id', function (req, res, next) {
    let indice = " ";
    indice = req.params.id;
    var q = ['UPDATEBasesOrdenes.OTOrigen SET ',
        'OTOrigenGen = ' + true + ',',

        ' WHERE OTOrigenNroPresup = "' + indice + '"'
    ].join(' ')


    console.log('q en cambia estado  ', q)

    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1264) {
                    return res.status(412).send({ message: "No pude cambiar el estado error 412" });
                }
                else {
                    if (err.errno == 1406) {
                        return res.status(410).send({ message: "No pude cambiar el estado error 410" });
                    }
                    else
                        console.log(err);
                }
            }
            else {
                res.json(result);
            };
        });


});

conexion.end;
module.exports = router;