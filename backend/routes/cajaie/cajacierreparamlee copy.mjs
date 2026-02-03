import express from 'express';

var router = express.Router();
import { conexion } from '../conexion.mjs';



router.get('/', function (req, res, next) {

    let q1 = ['SELECT *  FROM BaseCaja.CajaCierreParam'].join(' ')
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