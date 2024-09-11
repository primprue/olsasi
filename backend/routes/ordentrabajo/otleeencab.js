var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var dateFormat = require('dateformat');
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otleeencab");
    } else {
        console.log("no se conecto en otleeencab");
    }
});


var router = express();

router.get('/', function (req, res, next) {
    // var q = ['Select * from StkMonedas ' ].join(' ')
    var q = ['Select idOTEncab  as id, OTEncabCliente, OTEncabClienteNoReg, OTEncabEstado, ',
        'date_format(OTEncabFecha, "%d-%m-%Y") as OTEncabFecha, ',
<<<<<<< Updated upstream
        ' date_format(OTEncabFechaPromesa, "%d-%m-%Y") as OTEncabFechaPromesa, OTEncabImpTotal, OTEncabSenia, OTEncabTransporte from BasesOrdenes.OTEncab order by idOTEncab desc '].join(' ')
=======
        ' date_format(OTEncabFechaPromesa, "%d-%m-%Y") as OTEncabFechaPromesa, OTEncabImpTotal, OTEncabSenia, OTEncabTransporte from BasesOrdenes.OTEncab '].join(' ')
>>>>>>> Stashed changes
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
module.exports = router;