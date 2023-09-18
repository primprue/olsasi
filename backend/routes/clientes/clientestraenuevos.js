var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var exec = require('child_process').exec, child;




conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientestraenuevos");
    } else {
        console.log("no se conecto en clientestraenuevos");
    }
});




var router = express();

router.get('/', function (req, res, next) {



    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    const q = [
        'load data  infile ' + '"' + '/var/lib/mysql-files/clientes.csv' + '"  into table BasesGenerales.Clientes  FIELDS TERMINATED BY ' + '";"' + '',
    ].join(' ');
    conexion.query(
        q,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    console.log('los datos ya fueron tomados');
                }
                else {
                    console.log(err);
                }
            }
            else {
                res.json(result);

            }
        });


});
conexion.end;

module.exports = router;