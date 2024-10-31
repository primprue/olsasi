import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en stkmonedasleerorig");
    } else {
        console.log("no se conecto en stkmonedasleerorig");
    }
});


router.get('/', function (req, res, next) {
    var q = ['Select * from StkMonedas '].join('')

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