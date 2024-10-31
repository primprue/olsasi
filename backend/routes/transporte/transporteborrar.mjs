import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';
import mysql from 'mysql';


conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en transporteborrar");
    } else {
        console.log("no se conecto en transporteborrar");
    }
});


router.delete('/', async function (req, res) {
    var indice = req.query.id;
    var q = ['delete from BasesGenerales.Transporte where idTransporte = ' + indice].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1451) {
                    return res.status(411).send({ message: "error Código de transporte usado en otra tabla" });
                }
                {
                    console.log(err);
                }
            }
            else {
                res.json(result.rows);
            }
        });
});

export default router;
