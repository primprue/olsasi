const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otestadoleer");
    } else {
        console.log("no se conecto en otestadoleer");
    }
});

var router = express();
router.get('/', async function (req, res) {
    // router.get('/', (req, res, next) => {
    var datosrec = (req.query.datosaleer)
    // indice = req.query.id;
    var q = ['SELECT idOTEstado as value, OTEstadoDesc as label  FROM BasesOrdenes.OTEstado'].join(' ')
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