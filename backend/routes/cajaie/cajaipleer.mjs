import express from 'express';

var router = express.Router();
// var path = require('path');
import conexion from '../conexion.mjs';

//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en cajaipleer");
    } else {
        console.log("no se conecto en cajaipleer");
    }
});



router.get('/', function (req, res, next) {
    let q1
    q1 = ['SELECT idCajaIP as value, CajaIPDesc as label  FROM BaseCaja.CajaIP'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            } else {
                res.json(result);
            }
        });
});

export default router;