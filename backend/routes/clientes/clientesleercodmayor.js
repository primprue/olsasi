var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleercodmayor");
    } else {
        console.log("no se conecto en clientesleercodmayor");
    }
});




var router = express();

router.get('/', async function (req, res) {
    indice = req.query.id;
    var q = ['select ClientesDesc from BasesGenerales.Clientes where idClientes = (SELECT  max(idClientes) FROM BasesGenerales.Clientes)'].join(' ')
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
module.exports = router;