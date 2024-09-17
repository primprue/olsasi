var express = require('express');
var router = express.Router();
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

//router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otcondpagoagregar");
    } else {
        console.log("no se conecto en otcondpagoagregar");
    }
});

router.post('/', function (req, res) {
    var registro = {
        OTCondPagoDesc: req.body.otcondpagodesc,
        OTCondPagolinea: req.body.otcondpagodesc,
    }
    console.log('registro en otcondpagoagre  ', registro)

    conexion.query('INSERT INTO  BasesOrdenes.OTCondPago SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else {
                    console.log(err.errno);
                }
            } else {
                res.json(result.rows);

            }
        });
});




module.exports = router;