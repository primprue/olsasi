import express from 'express';
var router = express.Router();

import conexion from '../../conexion.mjs';

router.get('/', function (req, res, next) {
    var q = ['SELECT idParamComp as id,  ParamCompLetra, ParamCompAbrev, ParamCompSuc, ParamCompNro, ParamCompSR, ParamCompDesc, ParamCompDisc, ParamCompIVAAsoc FROM CtaCte.ParamComp '].join(' ')

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