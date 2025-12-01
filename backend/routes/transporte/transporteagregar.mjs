import express from 'express';
var router = express.Router();
import moment from 'moment';
import conexion from '../conexion.mjs';


moment.locale('es');


router.post('/', function (req, res, next) {

    var registro = {
        TransporteDesc: req.body.transdesc,
        TransporteTel1: req.body.transtel1,
        TransporteTel2: req.body.transtel2,
        TransporteWA: req.body.transwa,
        TransporteMail: req.body.transnromail,
        TransporteDom: req.body.transdom,
        TransporteLoc: req.body.transloc,
        TransporteDestino: req.body.transdestino,
        TransporteObser: req.body.transobser
    }

    conexion.query('INSERT INTO BasesGenerales.Transporte SET ?', registro,
        function (err, result) {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).send({ message: "error clave duplicada" });
                }
                else
                    if (err.errno == 1406) {
                        return res.status(410).send({ message: "excede los digitos permitidos" });
                    }
                    else {
                        console.log('error en proveedores ', err.errno);
                    }
            } else {
                res.json(result.rows);
            }
        });
});




export default router;