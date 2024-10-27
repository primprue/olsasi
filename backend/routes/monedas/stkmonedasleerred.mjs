import express from 'express';
var router = express.Router();
import path from 'path';
import conexion from '../conexion.mjs';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en stkmonedasleerred");
    } else {
        console.log("no se conecto en stkmonedasleerred");
    }
});




router.get('/', function (req, res, next) {
    var q = ['Select idStkMonedas as value, StkMonedasDescripcion as label from StkMonedas '].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err.errno);
            } else {
                res.json(result);
            }
        });


});
conexion.end;
export default router;