import express from 'express';
var router = express.Router();
import path from 'path';
import conexion from '../conexion.mjs';



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleercodmayor");
    } else {
        console.log("no se conecto en clientesleercodmayor");
    }
});



router.get('/', async function (req, res) {
    var indice = req.query.id;
    //var q = ['select ClientesDesc from BasesGenerales.Clientes where idClientes = (SELECT  max(idClientes) FROM BasesGenerales.Clientes)'].join(' ')
    var q = ['select  idClientes as id, ClientesDesc, ClientesDomicilio, ClientesCodPos, ',
        'ClientesLoc, ClientesPcia, ClientesTel, ClientesMail, ClientesIVA, ClientesCUIT, ',
        'ClientesTipo, ClientesContacto, ClientesCategoria, ClientesObserv1, ClientesObserv2, ',
        'ClientesFecha from BasesGenerales.Clientes where idClientes = (SELECT  max(idClientes) FROM BasesGenerales.Clientes)'].join(' ')


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