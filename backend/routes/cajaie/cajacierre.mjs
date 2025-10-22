import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';

//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en cajacierre");
    } else {
        console.log("no se conecto en cajacierre");
    }
});



router.get('/', function (req, res, next) {
    let q1
    let fechahoy = new Date().toISOString().split("T")[0]

    // q1 = ['SELECT idCajaIE as id, CajaIEFecha, CajaIECliente, CajaIEConcepto, CajaIEMT, CajaIEImporte, CajaIECodIP, CajaIEImpIP  FROM BaseCaja.CajaIE'].join(' ')
    // q1 = ['SELECT idCajaIE as id, CajaIEFecha, CajaIECliente, CajaIEConcepto, CajaCPDesc, CajaIEMT, CajaIEImporte, CajaIECodIP, CajaIEImpIP, CajaIEGrabado  FROM BaseCaja.CajaIE join BaseCaja.CajaCP where  BaseCaja.CajaIE.CajaIEConcepto = BaseCaja.CajaCP.idCajaCP'].join(' ')
    q1 = ['SELECT  CajaIEFecha, CajaIEMT, sum(CajaIEImporte) as CajaIEImporte,  CajaIEGrabado  FROM BaseCaja.CajaIE where  BaseCaja.CajaIE.CajaIEFecha = ' + fechahoy + 'group by CajaIEMT'].join(' ')
    console.log('q1 cajacierre', q1)
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