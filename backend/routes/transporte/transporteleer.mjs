import express from 'express';
var router = express.Router();
import { conexion } from '../conexion.mjs';


router.get('/', function (req, res, next) {
    const q = ['Select idTransporte as id, TransporteDesc,  TransporteTel1,',
        'TransporteTel2, TransporteWA, TransporteMail, TransporteDom, TransporteLoc,  ',
        'TransporteDestino, TransporteObser from BasesGenerales.Transporte '].join(' ');
    conexion.query(q,
        function (err, result) {
            if (err) {
                console.log(err.errno);
            } else {
                res.json(result);
            }
        });

});
conexion.end;


export default router;