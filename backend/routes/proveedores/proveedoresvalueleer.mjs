import express from 'express';


import { conexion } from '../conexion.mjs';


var router = express.Router();


router.get('/', function (req, res, next) {
    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    // SubRubros.SubRubroDetalle,
    const q = [
        'SELECT idProveedores as value, ProveedoresDesc as label FROM BasesGenerales.Proveedores ',
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
export default router;