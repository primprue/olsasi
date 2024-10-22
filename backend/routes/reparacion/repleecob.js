var express = require('express');
var conexion = require('../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en repleecob");
    } else {
        console.log("no se conecto en repleecob");
    }
});

var router = express();

router.get('/', function (req, res, next) {
    let q1
    q1 = ['select * from BasePresup.PresupParam'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            var coefmin = result[0].coeficientemin
            var q = [' Select round((StkRubroCosto * StkMonedasCotizacion * ' + coefmin + ' / 1.5), 0) as ValorMCC ',
                ' from StkRubro JOIN  StkMonedas  where StkRubroCodGrp = 1 and idStkRubro = 5  and StkRubroTM = idStkMonedas ',
            ].join(' ')
            conexion.query(q,
                function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(result);
                    }
                });
        });
    let q2
    q2 = ['select * from BasePresup.PresupParam'].join(' ')
    conexion.query(q2,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            var coefmin = result[0].coeficientemin
            var q = [' Select round((StkRubroCosto * StkMonedasCotizacion * ' + coefmin + ' / 1.5), 0) as ValorMCC ',
                ' from BasePresup.PresupConfTipo JOIN  StkMonedas  where idPresupConfTipo = 60 and idStkRubro = 5  and StkRubroTM = idStkMonedas ',
            ].join(' ')
            conexion.query(q,
                function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(result);
                    }
                });
        });
});

module.exports = router;