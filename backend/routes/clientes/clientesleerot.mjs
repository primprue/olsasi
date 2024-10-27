import express from 'express';
var router = express.Router();
import path from 'path';
import conexion from '../conexion.mjs';




conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleerot");
    } else {
        console.log("no se conecto en clientesleerot");
    }
});

router.get('/', function (req, res, next) {
    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    const q = [
        'SELECT',
        ' idClientes as value, ClientesDesc  as label',
        '  FROM BasesGenerales.Clientes ',
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


export default router;