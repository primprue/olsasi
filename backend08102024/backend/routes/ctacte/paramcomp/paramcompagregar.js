var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var conexion = require('../../conexion');


moment.locale('es');

//router = express();
conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en paramcompagregar");
    } else {
        console.log("no se conecto en paramcompagregar");
    }
});



router.post('/', function (req, res, next) {
    var registro = {
        // idParamComp: req.body.idParamComp,
        ParamCompLetra: req.body.ParamCompLetra,
        ParamCompAbrev: req.body.ParamCompAbrev,
        ParamCompSuc: req.body.ParamCompSuc,
        ParamCompNro: req.body.ParamCompNro,
        ParamCompSR: req.body.ParamCompSR,
        ParamCompDesc: req.body.ParamCompDesc,
        ParamCompDisc: req.body.ParamCompDisc,
        ParamCompIVAAsoc: req.body.ParamCompIVAAsoc
    }

    console.log('registro en alta  ', registro)
    conexion.query('INSERT INTO CtaCte.ParamComp SET ?', registro,

        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else
                    if (err.errno == 1406 || err.errno == 1264) {
                        return res.status(410).send({ message: "Código con más de cuatro letras" });
                    }
                {
                    console.log(err.errno);
                }
            }


            else {
                res.json(result.rows);
            };
        });
});





module.exports = router;