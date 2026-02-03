import express from 'express';
var router = express.Router();

import { conexion } from '../conexion.mjs';




router.get('/', function (req, res, next) {

    q = [
        'SET @numero=0; ',
        'SELECT @numero:=@numero+1 as id, sum(StkItemsCantDisp) as Cantidad, StkItemsRubroAbr, StkRubroDesc, StkRubroCosto,',
        'StkRubroTM, sum(StkItemsCantDisp) * StkRubroCosto as TotalItem ',
        'from BaseStock.StkItems join BaseStock.StkRubro where StkRubroAbr = StkItemsRubroAbr group by StkItemsRubroAbr'].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result[1]);

            }
        });
});

export default router;