import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';

//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en buscaie");
    } else {
        console.log("no se conecto en buscaie");
    }
});



router.get('/', function (req, res, next) {
    let q1

    q1 = ['SELECT idCajaIE as id, date_format(CajaIEFecha, "%d-%m-%Y") as CajaIEFecha,  CajaIECliente, CajaIEConcepto, CajaCPDesc, CajaIEMT, ',
        ' CajaIEMoneda, CajaIEImporte, CajaIECodIP, CajaIEImpIP, CajaIEGrabado  FROM BaseCaja.CajaIE join BaseCaja.CajaCP  ',
        ' where  BaseCaja.CajaIE.CajaIEConcepto = BaseCaja.CajaCP.idCajaCP and ',
        ' CajaIEFecha >= "' + req.query.fechaDesde + '" and CajaIEFecha <= "' + req.query.fechaHasta + '"'].join(' ')

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