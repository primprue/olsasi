var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var mysql = require('mysql');

var router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otcondpagoborrar");
    } else {
        console.log("no se conecto en otcondpagoborrar");
    }
});


router.delete('/', async function (req, res) {
    indice = req.query.id;
    var q = ['delete from  BasesOrdenes.OTCondPago where idOTCondPago = ' + indice].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1451) {
                    return res.status(411).send({ message: "error Código de OTCondPago usado en otra tabla" });
                }
                {
                    console.log(err);
                }
            }
            else {
                res.json(result.rows);
            }
        });
});

module.exports = router;
