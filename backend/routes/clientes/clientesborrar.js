var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var mysql = require('mysql');

var router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesborrar");
    } else {
        console.log("no se conecto en clientesborrar");
    }
});


router.delete('/', async function (req, res) {
    indice = req.query.id;
    console.log('indice  ', indice)
    var q = ['delete from BasesGenerales.Clientes where idClientes = ' + indice].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1451) {
                    return res.status(411).send({ message: "error Código de cliente usado en otra tabla" });
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
