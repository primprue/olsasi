import express from 'express';
var router = express.Router();
import path from 'path';
import conexion from '../conexion.mjs';
import mysql from 'mysql';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresborrar");
    } else {
        console.log("no se conecto en proveedoresborrar");
    }
});

// router.post("/?:id", function (req, res) {
//     //var indice = req.params.id;
//     var indice = req.params.id;
// router.delete('/', async function (req, res) {
//     console.log('req.q  ', req.query.id);
//     indice = req.query.id;


router.delete('/?:id', async function (req, res) {
    console.log('req.q  ', req.query.id);
    console.log('req.query  ', req.query);
    console.log('req.params  ', req.params);
    var indice = req.params.id;
    var q = ['delete from BasesGenerales.Proveedores where idProveedores = ' + indice].join(' ')
    console.log('q en borrar ', q)
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1451) {
                    return res.status(411).send({ message: "error Código de proveedor usado en otra tabla" });
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
