var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');




conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleerpresup");
    } else {
        console.log("no se conecto en clientesleerpresup");
    }
});




var router = express();

router.get('/', function (req, res, next) {
    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    const q = [
        'SELECT',
        ' idClientes as PresupEncabCliente, ClientesDesc ',
        '  FROM BasesGenerales.Clientes ',
        // ' where BasesGenerales.Clientes.ClientesTipo = BasesGenerales.SubRubros.idSubRubro ',
        ' order by ClientesDesc',

    ].join(' ');

    conexion.query(
        q,
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