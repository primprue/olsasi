var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
const Afip = require('@afipsdk/afip.js');
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleer");
    } else {
        console.log("no se conecto en clientesleer");
    }
});



var router = express();

router.get('/', function (req, res, next) {

    const afip = new Afip({ CUIT: 20409378472 });
    console.log('afi  ', afip)

    //as StkTipoProveedDesc
    // en el mysql tuve que cambiar la clave foránea porque no me permitía cambiar el tipodeproveedor en la tabla proveedores
    // const q = [
    //     'SELECT',
    //     ' idClientes, ClientesDesc, ',
    //     ' ClientesCalle, ClientesNroCalle, ',
    //     'ClientesPiso, ClientesDto, ClientesCodPos, ',
    //     'ClientesLoc, ClientesPcia, ClientesTel, ',
    //     'ClientesMail, ',
    //     'ClientesIVA, ClientesCUIT, ClientesTipo ',
    //     '  FROM BasesGenerales.Clientes ',
    //     // ' where BasesGenerales.Clientes.ClientesTipo = BasesGenerales.SubRubros.idSubRubro ',
    //     ' order by ClientesDesc',

    // ].join(' ');
    const q = [
        'SELECT  idClientes as id, ClientesDesc, ClientesDomicilio, ClientesCodPos, ',
        'ClientesLoc, ClientesPcia, ClientesTel, ClientesMail, ClientesIVA, ClientesCUIT, ',
        'ClientesTipo, ClientesContacto, ClientesCategoria, ClientesObserv1, ClientesObserv2, ',
        'ClientesFecha FROM BasesGenerales.Clientes ',
        ' order by ClientesDesc',
    ].join(' ');

    // const q = [
    //     'SELECT idClientes as id, * FROM BasesGenerales.Clientes ',
    //     ' order by ClientesDesc',
    // ].join(' ');
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