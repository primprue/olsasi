import express from 'express';
var router = express.Router();

import moment from 'moment';
import { conexion } from '../../conexion.mjs';


moment.locale('es');





router.post('/', function (req, res, next) {
    var registro = {
        ParamCompLetra: req.body.ParamCompLetra,
        ParamCompAbrev: req.body.ParamCompAbrev,
        ParamCompSuc: req.body.ParamCompSuc,
        ParamCompNro: req.body.ParamCompNro,
        ParamCompSR: req.body.ParamCompSR,
        ParamCompDesc: req.body.ParamCompDesc,
        ParamCompDisc: req.body.ParamCompDisc,
        ParamCompIVAAsoc: req.body.ParamCompIVAAsoc
    }

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
            }
        });
});

export default router;