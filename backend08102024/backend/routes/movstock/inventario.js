var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en inventario");
    } else {
        console.log("no se conecto en inventario");
    }
});

var router = express();


router.get('/', function (req, res, next) {
    var q = ["SET @numero=0 "].join(" ");
    conexion.query(q, function (err, result) {
        if (err) {
            console.log(err);
        }
    });
    var q = ['SELECT @numero:=@numero+1 as id, sum(StkItemsCantDisp) as Cantidad, StkItemsRubroAbr, StkRubroDesc, StkRubroCosto,',
        'StkRubroTM, sum(StkItemsCantDisp) * StkRubroCosto as TotalItem ',
        'from BaseStock.StkItems join BaseStock.StkRubro where StkRubroAbr = StkItemsRubroAbr group by StkItemsRubroAbr'].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
});

module.exports = router;