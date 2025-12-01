import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';



router.get('/', function (req, res, next) {
    let q1

    // q1 = ['SELECT idCajaSaldoEfFecha  FROM BaseCaja.CajaSaldoEf ORDER BY idCajaSaldoEfFecha DESC LIMIT 1'].join(' ')

    q1 = ['SELECT  idCajaSaldoEfFecha, CajaSaldoEfImporte, CajaSaldoEfMoneda FROM BaseCaja.CajaSaldoEf WHERE idCajaSaldoEfFecha = (SELECT MAX(idCajaSaldoEfFecha) ',
        'FROM BaseCaja.CajaSaldoEf)'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            }
            res.json(result);
        });
});

export default router;