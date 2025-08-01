import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';

//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en cajasaldoefagregar");
    } else {
        console.log("no se conecto en cajasaldoefagregar");
    }
});



router.get('/', function (req, res, next) {
    var d = new Date();
    var finalDate = d.toISOString().split("T")[0];
    var registro = {
        idCajaSaldoEfFecha: finalDate,
        CajaSaldoEfImporte: req.body.CajaSaldoEfImporte,
    }
    conexion.query('INSERT INTO CajaSaldoEf SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else {
                    console.log(err.errno);
                }
            }


            else {
                res.json(result.rows);
            }
        });
});

export default router;