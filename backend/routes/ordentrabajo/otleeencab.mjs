import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';


router.get('/', function (req, res, next) {
    var q = ['Select idOTEncab  as id, OTEncabCliente, OTEncabClienteNoReg, OTEncabEstado, ',
        'date_format(OTEncabFecha, "%d-%m-%Y") as OTEncabFecha, ',
        ' date_format(OTEncabFechaPromesa, "%d-%m-%Y") as OTEncabFechaPromesa, OTEncabImpTotal, OTEncabSenia, OTEncabconIVA, OTEncabTransporte from BasesOrdenes.OTEncab order by idOTEncab desc '].join(' ')
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