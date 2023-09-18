var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

//router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesagregar");
    } else {
        console.log("no se conecto en clientesagregar");
    }
});


router.post('/', function (req, res) {
    var registro = {
        ClientesDesc: req.body.cliendesc,
        ClientesCalle: req.body.cliencalle,
        ClientesNroCalle: req.body.cliennrocalle,
        ClientesPiso: req.body.clienpiso,
        ClientesDto: req.body.cliendto,
        ClientesCodPos: req.body.cliencodpostal,
        ClientesLoc: req.body.clienlocalidad,
        ClientesPcia: req.body.clienprovincia,
        ClientesTel: req.body.clientelefono,
        ClientesMail: req.body.clienmail,
        ClientesIVA: req.body.clieniva,
        ClientesCUIT: req.body.cliencuit,
        ClientesTipo: req.body.clientipo,
    }
    console.log('registro clientes  ', registro)
    conexion.query('INSERT INTO BasesGenerales.Clientes SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else {
                    console.log('error en alta cliente ', err.errno);
                }
            }
            else {
                res.json(result.rows);

            }
        });

});




module.exports = router;