var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');


conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en modprecios");
    } else {
        console.log("no se conecto en modprecios");
    }
});

var router = express();

router.post('/', async function (req, res, next) {

    var compbody, compmysql
    var d = new Date();
    finalDate = d.toISOString().split("T")[0];

    if (req.body.idProveedores != 0) {
        compbody = req.body.idProveedores
        compmysql = 'StkRubroProv'
    }
    if (req.body.idStkGrupo != 0) {
        compbody = req.body.idStkGrupo
        compmysql = 'StkRubroCodGrp'
    }
    if (req.body.StkRubroAbr) {
        compbody = '"' + req.body.StkRubroAbr + '"'
        compmysql = 'StkRubroAbr'
    }

    var importemod = req.body.importemod;
    var porcentmod = req.body.porcentmod;

    if (importemod != 0) {
        var q = ['UPDATE StkRubro SET',
            ' StkRubroFecha = "',
            finalDate,
            '", StkRubroCosto = StkRubroCosto + ' + importemod,
            ' WHERE ' + compmysql + ' = ' + compbody,
        ].join('')
    }
    else {
        var q = ['UPDATE StkRubro SET',
            ' StkRubroFecha = "',
            finalDate,
            '", StkRubroCosto = StkRubroCosto + ',
            '(StkRubroCosto * ' + porcentmod / 100 + ')',
            ' WHERE ' + compmysql + ' = ' + compbody,
        ].join('')
    }
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1054) {
                    return res.status(414).send({ message: "Faltan datos para leer información en tabl" });
                }
                else
                    console.log('Error en UPDATE modprecios en ' + compmysql);
                console.log(err);
            }
            else {
                res.json(result);
            }
        })

})

module.exports = router;