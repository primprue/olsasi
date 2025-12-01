import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';



router.get('/', async function (req, res) {
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