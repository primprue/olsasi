import express from 'express';

var router = express.Router();
// var path = require('path');
import { conexion } from '../conexion.mjs';




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