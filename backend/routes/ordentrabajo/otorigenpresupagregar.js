var express = require('express');
var router = express.Router();
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

//router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otorigenpresupagregar");
    } else {
        console.log("no se conecto en otorigenpresupagregar");
    }
});

router.post('/', function (req, res) {
    datosrec = JSON.parse(req.query.renglonelegido);
    var i = 0

    datosrec.map(datos => {
        registro = {
            OTOrigenNroPresup: datos.PresupRenglonNroPresup,
            OTOrigenNroReng: datos.idPresupRenglon
        }

        conexion.query("INSERT INTO BasesOrdenes.OTOrigen SET ?", registro, function (err, result) {
            // conexion.query(q, function (err, result) {
            if (err) {
                console.log("ERROR ");
                console.log(err.errno);
            }
            else {
                console.log('result rows  ', result)
                res.json(result);
            }
        });
    });
});


module.exports = router;