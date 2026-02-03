import express from 'express';
var router = express.Router();
import { conexion } from '../conexion.mjs';



router.get('/', async function (req, res) {
    let indice = req.query.id;

    var q = ['SELECT * FROM BasesOrdenes.OTCondPago where idOTCondPago = ' + indice].join(' ')
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });

});
conexion.end;
export default router;