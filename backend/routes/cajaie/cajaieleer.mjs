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

    q1 = ['SELECT idCajaIE as id, CajaIEFecha, CajaIECliente, CajaIEConcepto, CajaIEPunto, CajaIEImporte, CajaIECodIP, CajaIEImpIP  FROM BaseCaja.CajaIE'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            }
            else {
                // if (result.length == 0) {
                //     let q2 = ["INSERT INTO BaseCaja.CajaIE ( CajaIEFecha  ) VALUES(" + "'" + fechahoy + "'" + ")"].join(' ')
                //     console.log('q2', q2)
                //     conexion.query(q2,
                //         function (err, result) {
                //             if (err) {
                //                 console.log(err);

                //             } else {
                //                 conexion.query(q1,
                //                     function (err, result) {
                //                         if (err) {
                //                             console.log(err);

                //                         }
                //                         else {
                //                             res.json(result);
                //                         }
                //                     })
                //             }
                //         })
                // }
                res.json(result);
            }
        });
});

export default router;