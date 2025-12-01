import express from 'express';


import conexion from '../conexion.mjs';


var router = express.Router();

// conexion.connect(function (err) {
//     if (!err) {
//         console.log("base de datos conectada en proveedoresleer");
//     } else {
//         console.log("no se conecto en proveedoresleer");
//     }
// });



router.get('/', function (req, res, next) {
    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    // SubRubros.SubRubroDetalle,
    const q = [
        'SELECT',
        'idProveedores as id, ProveedoresDesc, ',
        'SubRubros.SubRubroDetalle, ProveedoresTipo, ',
        'ProveedoresCUIT, ProveedoresCalle, ProveedoresNroCalle, ',
        'ProveedoresPiso, ProveedoresDto, ProveedoresCodPos, ',
        'ProveedoresLoc, ProveedoresPcia, ProveedoresTel, ',
        'ProveedoresContacto, ProveedoresMail, ProveedoresWeb, ',
        'ProveedoresCodMon',
        '  FROM BasesGenerales.Proveedores ',
        ' JOIN BasesGenerales.SubRubros ',
        ' where BasesGenerales.Proveedores.ProveedoresTipo = BasesGenerales.SubRubros.idSubRubro ',
        ' order by ProveedoresDesc',
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