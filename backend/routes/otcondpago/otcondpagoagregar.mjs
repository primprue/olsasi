import express from 'express';
var router = express.Router();
import { conexion } from '../conexion.mjs';


router.post('/', function (req, res) {
    console.log(req.body);
    var registro = {
        OTCondPagoDesc: req.body.OTCondPagoDesc,

    }
    console.log(registro);
    conexion.query('INSERT INTO  BasesOrdenes.OTCondPago SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else {
                    console.log(err.errno);
                }
            } else {
                res.json(result.rows);

            }
        });
});

export default router;