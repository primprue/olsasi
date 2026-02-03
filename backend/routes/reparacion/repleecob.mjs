import express from 'express';
import { conexion } from '../conexion.mjs';

var router = express.Router();


router.get('/', function (req, res, next) {
    let q1
    q1 = ['select * from BasePresup.PresupParam'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            var coefmin = result[0].coeficientemin
            var q = [' Select round((StkRubroCosto * StkMonedasCotizacion * ' + coefmin + ' / 1.5), 0) as ValorMCC ',
                ' from StkRubro JOIN  StkMonedas  where StkRubroCodGrp = 1 and idStkRubro = 5  and StkRubroTM = idStkMonedas ',
            ].join(' ')

            conexion.query(q,
                function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(result);
                    }
                });
        });

});

export default router;