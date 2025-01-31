var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');



conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en clientesleerdescod");
    } else {
        console.log("no se conecto en clientesleerdescod");
    }
});




var router = express();

router.get('/', async function (req, res) {
    indice = req.query.id;
    console.log('indice clientesleerdescod  ', indice)
    var q = ['SELECT ClientesDesc FROM BasesGenerales.Clientes where idClientes = ' + indice].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno === 1064) {
                    result = 0
                    res.json(result);
                }
                else {
                    console.log('ingreso al error  ', result)
                    console.log(err);
                }
            }
            else {
                res.json(result);

            }
        });

});
conexion.end;
module.exports = router;