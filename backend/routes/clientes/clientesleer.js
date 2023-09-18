var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleer");
    } else {
        console.log("no se conecto en clientesleer");
    }
});




var router = express();

router.get('/', function (req, res, next) {


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
        'SELECT * FROM BasesGenerales.Clientes ',
        // ' where BasesGenerales.Clientes.ClientesTipo = BasesGenerales.SubRubros.idSubRubro ',
        ' order by ClientesDesc',

    ].join(' ');
    conexion.query(
        q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('result  ', result)
                res.json(result);
            }
        });

});
conexion.end;


module.exports = router;