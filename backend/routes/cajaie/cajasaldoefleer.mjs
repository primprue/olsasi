import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';

//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en cajasaldoefleer");
    } else {
        console.log("no se conecto en cajasaldoefleer");
    }
});



router.get('/', function (req, res, next) {
    let q1

    // q1 = ['SELECT idCajaSaldoEfFecha  FROM BaseCaja.CajaSaldoEf ORDER BY idCajaSaldoEfFecha DESC LIMIT 1'].join(' ')

    q1 = ['SELECT  idCajaSaldoEfFecha, CajaSaldoEfImporte, CajaSaldoMoneda FROM BaseCaja.CajaSaldoEf WHERE idCajaSaldoEfFecha = (SELECT MAX(idCajaSaldoEfFecha) ',
        'FROM BaseCaja.CajaSaldoEf)'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            }
            console.log('result', result);
            res.json(result);
        });
});

export default router;