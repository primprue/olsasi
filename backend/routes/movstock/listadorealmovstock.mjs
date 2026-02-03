import express from 'express';
var router = express.Router();

import { conexion } from '../conexion.mjs';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en listadorealmovstock");
    } else {
        console.log("no se conecto en listadorealmovstock");
    }
});

router.get('/', function (req, res, next) {
    var indice = req.query.id;

    let q = ['SELECT  StkItemsRubroAbr, StkItemsDesc, StkItemsCantidad - StkItemsCantDisp as StockReal ' +
        ' FROM BaseStock.StkItems where StkItemsRubroAbr = "' + indice + '"'].join(' ')

    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
});

export default router;