import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresleertipo26");
    } else {
        console.log("no se conecto en proveedoresleertipo26");
    }
});






router.get('/', async function (req, res) {
    var q = ['SELECT idProveedores, ProveedoresDesc FROM BasesGenerales.Proveedores where ProveedoresTipo = 26 order by ProveedoresDesc'].join(' ')
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
export default router;