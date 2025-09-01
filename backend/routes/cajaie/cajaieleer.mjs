import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';

//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en cajaieleer");
    } else {
        console.log("no se conecto en cajaieleer");
    }
});



router.get('/', function (req, res, next) {
    let q1
    let fechahoy = new Date().toISOString().split("T")[0]

    q1 = ['SELECT idCajaIE as id, date_format(CajaIEFecha, "%d-%m-%Y") as CajaIEFecha,  CajaIECliente, CajaIEConcepto, CajaCPDesc, CajaIEPunto, ',
        ' CajaIEMoneda, CajaIEImporte, CajaIECodIP, CajaIEImpIP, CajaIEGrabado  FROM BaseCaja.CajaIE join BaseCaja.CajaCP where  BaseCaja.CajaIE.CajaIEConcepto = BaseCaja.CajaCP.idCajaCP'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            }
            else {
                res.json(result);
            }
        });
});

export default router;