var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('../conexion');




moment.locale('es');

//router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientespresupagregar");
    } else {
        console.log("no se conecto en clientespresupagregar");
    }
});

router.post('/', function (req, res) {
    var registro = {
        ClientesPresupDesc: req.body.cliendesc,
        ClientesPresupTel: req.body.clientelefono,
        ClientesPresupMail: req.body.clienmail,

    }
    conexion.query('INSERT INTO BasesGenerales.ClientesPresup SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada Clientes Presup" });
                }
                else {
                    console.log('error en alta cliente Presup', err.errno);
                }
            }
            else {
                res.json(result.rows);

            }
        });

});




module.exports = router;