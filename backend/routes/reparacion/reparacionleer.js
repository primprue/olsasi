var express = require('express');
// var router = express.Router();
var path = require('path');
var conexion = require('../conexion');




conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en reparacionleer");
    } else {
        console.log("no se conecto en reparacionleer");
    }
});




var router = express();

router.get('/', function (req, res, next) {
    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    // SubRubros.SubRubroDetalle,
    const q = [
        'SELECT *  FROM reparacion.parametrosrep ',
    ].join(' ');
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err.errno);
            } else {
                res.json(result);
            }
        });

});
conexion.end;
module.exports = router;