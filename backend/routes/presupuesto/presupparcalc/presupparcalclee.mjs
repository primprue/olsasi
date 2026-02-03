import express from 'express';
var router = express.Router();

import { conexion } from '../../conexion.mjs';


router.get('/', function (req, res, next) {
    var paracalculo = req.query.id;
    var q = ['Select PresupParCalTit as value, PresupParCalOpcion as label from BasePresup.PresupParCalc where PresupParCalDesc = "' + paracalculo + '" order by PresupParCalDesc, PresupParCalTit'].join(' ')
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