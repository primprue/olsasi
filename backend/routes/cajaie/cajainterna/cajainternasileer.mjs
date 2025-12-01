import express from 'express';

var router = express.Router();
import conexion from '../../conexion.mjs';




router.get('/', function (req, res) {
    let q1

    q1 = [`SELECT idCajaInternaSI as id, 
         CajaInternaSIFecha,
        CajaInternaSIM, CajaInternaSIT
        FROM BaseCaja.CajaInternaSI
         WHERE CajaInternaSIFecha = (SELECT MAX(CajaInternaSIFecha)
        FROM BaseCaja.CajaInternaSI)`].join(' ')
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