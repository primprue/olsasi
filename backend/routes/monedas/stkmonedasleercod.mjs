
import express from 'express';
var router = express.Router();
import conexion from '../conexion.mjs';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en stkmonedasleercod");
    } else {
        console.log("no se conecto en stkmonedasleercod");
    }
});



router.get('/', function (req, res) {
    var q = ['Select StkMonedasCotizacion / 1.13 as DolDiv from StkMonedas where idStkMonedas = "DLS"'].join(' ')
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