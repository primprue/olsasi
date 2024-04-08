var express = require('express');
var router = express.Router();
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

//router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en transporteagregar");
    } else {
        console.log("no se conecto en transporteagregar");
    }
});

router.post('/', function (req, res) {

    var registro = {
        TransporteDesc: req.body.transdesc,
        TransporteTel1: req.body.transtel1,
        TransporteTel2: req.body.transtel2,
        TransporteWA: req.body.transwa,
        TransporteMail: req.body.transnromail,
        TransporteDom: req.body.transdom,
        TransporteLoc: req.body.transloc,
        TransporteDestino: req.body.transdestino,
        TransporteObser: req.body.transobser
    }

    conexion.query('INSERT INTO BasesGenerales.Transporte SET ?', registro,
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