
import express from 'express';
var router = express.Router();
import { conexion } from '../conexion.mjs';




router.get('/', function (req, res) {
    var q = ['Select StkMonedasCotizacion / 1.13 as DolDiv from StkMonedas where idStkMonedas = "USD"'].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
});
conexion.end;
export default router;