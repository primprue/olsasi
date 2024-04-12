var express = require('express');
var router = express.Router();
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otorigenlee");
    } else {
        console.log("no se conecto en otorigenlee");
    }
});

router.get('/', function (req, res, next) {
    // var q = ['Select * from StkMonedas ' ].join(' ')
    var q = ['Select *  from  BasesOrdenes.OTOrigen where OTOrigenGen = 0 '].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err.errno);
            } else {
                console.log('result en otorigenlee  ', result)
                res.json(result);
            }
        });


});

conexion.end;
module.exports = router;