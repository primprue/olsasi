import express from 'express';

var router = express.Router();
import conexion from '../conexion.mjs';




router.get('/', function (req, res, next) {
    let q1

    q1 = ['SELECT  * FROM BaseCaja.CajaSaldoEf '].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            }
            res.json(result);
        });
});

export default router;