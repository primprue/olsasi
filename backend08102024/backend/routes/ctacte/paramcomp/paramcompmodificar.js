var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../../conexion');


conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en paramcompmodificar");
    } else {
        console.log("no se conecto en paramcompmodificar");
    }
});



var router = express();



var router = express();

router.post('/?:id', function (req, res, next) {
    let indice = " ";
    indice = req.params.id;

    ParamCompLetra = req.body.ParamCompLetra;
    ParamCompAbrev = req.body.ParamCompAbrev;
    ParamCompSuc = req.body.ParamCompSuc;
    ParamCompNro = req.body.ParamCompNro;
    ParamCompSR = req.body.ParamCompSR;
    ParamCompDesc = req.body.ParamCompDesc;
    ParamCompDisc = req.body.ParamCompDisc;
    ParamCompIVAAsoc = req.body.ParamCompIVAAsoc;


    var q = ['UPDATE CtaCte.ParamComp SET ',
        'ParamCompLetra = "', ParamCompLetra, '",',
        ' ParamCompAbrev = "', ParamCompAbrev, '",',
        ' ParamCompSuc = ', ParamCompSuc, ',',
        ' ParamCompNro = ', ParamCompNro, ',',
        ' ParamCompSR = "', ParamCompSR, '",',
        ' ParamCompDesc = "', ParamCompDesc, '",',
        ' ParamCompDisc = "', ParamCompDisc, '",',
        ' ParamCompIVAAsoc = ', ParamCompIVAAsoc,
        ' WHERE idParamComp = ', indice,
    ].join('')
    conexion.query(q,
        function (err, result) {
            if (err) {
                if (err.errno == 1264) {
                    return res.status(412).send({ message: "El campo numérico más dígitos de los que corresponde" });
                }
                else {
                    if (err.errno == 1406) {
                        return res.status(410).send({ message: "El campo alfanumérico dígitos de los que corresponde" });
                    }
                    else
                        console.log(err);
                }
            }
            else {
                res.json(result);
            };
        });
});


module.exports = router;