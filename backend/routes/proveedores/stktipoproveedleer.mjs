import express from 'express';
var router = express.Router();

import conexion from '../conexion.mjs';


conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en stktipoproveedleer");
    } else {
        console.log("no se conecto en stktipoproveedleer");
    }
});


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