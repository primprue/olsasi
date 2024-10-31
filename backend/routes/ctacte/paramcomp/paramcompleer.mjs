import express from 'express';
var router = express.Router();

import conexion from '../../conexion.mjs';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en paramcompleer");
    } else {
        console.log("no se conecto en paramcompleer");
    }
});



router.get('/', function (req, res, next) {
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
export default router;