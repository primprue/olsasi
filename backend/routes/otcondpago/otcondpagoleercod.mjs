import express from 'express';
var router = express.Router();
import path from 'path';
import conexion from '../conexion.mjs';



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otcondpagoleercod");
    } else {
        console.log("no se conecto en otcondpagoleercod");
    }
});






router.get('/', async function (req, res) {
    indice = req.query.id;

    //  'SELECT idProveedores, ProveedoresDesc, ProveedoresTipo, ProveedoresCUIT, ProveedoresCalle, ProveedoresNroCalle, ProveedoresPiso, ProveedoresDto, ProveedoresCodPos, ProveedoresLoc, ProveedoresPcia, ProveedoresTel, ProveedoresContacto, ProveedoresMail, ProveedoresWeb, ProveedoresCodMon FROM BasesGenerales.Proveedores where idProveedores = ' + indice,
    var q = ['SELECT * FROM BasesOrdenes.OTCondPago where idOTCondPago = ' + indice].join(' ')
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