var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../../conexion');

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en paramcompleer");
    } else {
        console.log("no se conecto en paramcompleer");
    }
});


var router = express();

router.get('/', function (req, res, next) {
    // var q = ['Select * from StkMonedas ' ].join(' ')
    var q = ['SELECT idParamComp as id,  ParamCompLetra, ParamCompAbrev, ParamCompSuc, ParamCompNro, ParamCompSR, ParamCompDesc, ParamCompDisc, ParamCompIVAAsoc FROM CtaCte.ParamComp '].join(' ')

    console.log('q  ', q)
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