const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otarmatabla");
    } else {
        console.log("no se conecto en otarmatabla");
    }
});

var router = express();
router.get('/', async function (req, res) {
    // router.get('/', (req, res, next) => {
    datosrec = (req.query.datoselegidoa)
    console.log('req  ', req)
    // indice = req.query.id;
    console.log('datosrec  ', JSON.stringify(datosrec))

    // var q = ['SELECT idPresupEncab, date_format(PresupEncabFecha, "%d/%m/%Y") as PresupEncabFecha , PresupEncabCliente, PresupEncabTotal, PresupEncabMayMin, PresupEncabExplic  FROM BasePresup.PresupEncab where idPresupEncab = ' + datosrec].join(' ')
    // conexion.query(q,
    //     function (err, result) {
    //         if (err) {
    //             if (err.errno === 1064) {
    //                 result = 0
    //                 res.json(result);
    //             }
    //             else {
    //                 console.log('ingreso al error  ', result)
    //                 console.log(err);
    //             }
    //         }
    //         else {
    //             res.json(result);

    //         }
    //     });
})

conexion.end
module.exports = router;