var express = require('express');
var router = express.Router();
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en datosencabpresupeleg");
    } else {
        console.log("no se conecto en datosencabpresupeleg");
    }
});

var router = express();
router.get('/', async function (req, res) {
    // router.get('/', (req, res, next) => {
    datosrec = (req.query.idpresup)
    // indice = req.query.id;


    var q = ['SELECT idPresupEncab, date_format(PresupEncabFecha, "%d/%m/%Y") as PresupEncabFecha , PresupEncabCliente, PresupEncabTotal, PresupEncabMayMin, PresupEncabExplic  FROM BasePresup.PresupEncab where idPresupEncab = ' + datosrec].join(' ')
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
})

conexion.end
module.exports = router;