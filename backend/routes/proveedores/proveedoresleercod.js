var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');



conexion.connect(function(err) {
    if (!err) {
        console.log("base de datos conectada en proveedoresleercod");
    } else {
        console.log("no se conecto en proveedoresleercod");
    }
});




var router = express();

router.get('/', async function(req, res) {
       indice = req.query.id;
   //  'SELECT idProveedores, ProveedoresDesc, ProveedoresTipo, ProveedoresCUIT, ProveedoresCalle, ProveedoresNroCalle, ProveedoresPiso, ProveedoresDto, ProveedoresCodPos, ProveedoresLoc, ProveedoresPcia, ProveedoresTel, ProveedoresContacto, ProveedoresMail, ProveedoresWeb, ProveedoresCodMon FROM BasesGenerales.Proveedores where idProveedores = ' + indice,
var q = ['SELECT * FROM BasesGenerales.Proveedores where idProveedores = ' + indice].join(' ')
       conexion.query(q,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
        
});
conexion.end;
module.exports = router;