var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleerdescmayigual");
    } else {
        console.log("no se conecto en clientesleerdescmayigual");
    }
});



var router = express();

router.get('/', async function (req, res) {
    clientenuevo = req.query.clientenuevo;
    var q = [`SELECT * FROM BasesGenerales.Clientes where ClientesDesc >= "${clientenuevo}"`].join(' ')
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