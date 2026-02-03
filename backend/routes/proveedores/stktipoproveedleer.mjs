import express from 'express';
var router = express.Router();

import { conexion } from '../conexion.mjs';


router.get('/', function (req, res, next) {

    conexion.query('Select * from StkTipoProveed ',
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });


});

export default router;