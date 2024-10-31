import express from 'express';
var router = express.Router();
import conexion from '../conexion.mjs';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en reparacionleer");
    } else {
        console.log("no se conecto en reparacionleer");
    }
});






router.get('/', function (req, res, next) {

    const q = [
        'SELECT *  FROM reparacion.parametrosrep ',
    ].join(' ');
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