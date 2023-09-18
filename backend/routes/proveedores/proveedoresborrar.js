var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var mysql = require('mysql');

var router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresborrar");
    } else {
        console.log("no se conecto en proveedoresborrar");
    }
});

// router.post("/?:id", function (req, res) {
//     //indice = req.params.id;
//     indice = req.params.id;
// router.delete('/', async function (req, res) {
//     console.log('req.q  ', req.query.id);
//     indice = req.query.id;


router.delete('/?:id', async function (req, res) {
    console.log('req.q  ', req.query.id);
    console.log('req.query  ', req.query);
    console.log('req.params  ', req.params);
    indice = req.params.id;
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

module.exports = router;
