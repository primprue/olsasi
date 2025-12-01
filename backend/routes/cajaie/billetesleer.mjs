import express from 'express';

var router = express.Router();
import conexion from '../conexion.mjs';



router.get('/', function (req, res, next) {
    let q1
    q1 = ['SELECT idBilletes as value, BilletesValor as label, BilletesMoneda  FROM BaseCaja.Billetes order by BilletesValor desc'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            } else {
                res.json(result);
            }
        });
});

export default router;