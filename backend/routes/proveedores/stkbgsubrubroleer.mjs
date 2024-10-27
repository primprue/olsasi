import express from 'express';
var router = express.Router();
import path from 'path';
import conexion from '../conexion.mjs';


conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en stkbgsubrubroleer");
    } else {
        console.log("no se conecto en stkbgsubrubroleer");
    }
});






router.get('/', function (req, res, next) {
    conexion.query('Select idSubRubro as value, SubRubroDetalle as label from BasesGenerales.SubRubros ',
        // conexion.query('Select idSubRubro as value, SubRubroDetalle as text  from BasesGenerales.SubRubros ',
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('result  ', result)
                res.json(result);
            }
        });


});

export default router;