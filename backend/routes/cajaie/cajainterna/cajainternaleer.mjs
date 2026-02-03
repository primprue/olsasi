import express from 'express';

var router = express.Router();
import { conexion } from '../../conexion.mjs';




router.get('/', function (req, res) {
    let q1
    // date_format(CajaInternaFecha, "%d-%m-%Y") as CajaInternaFecha,
    q1 = [`SELECT idCajaInterna as id, 
         date_format(CajaInternaFecha, "%d-%m-%Y") as CajaInternaFecha,
        CajaInternaConcepto, CajaInternaMoneda,
        CajaInternaES, CajaInternaMT, CajaInternaImporte, CajaInternaTotalInstr
        FROM BaseCaja.CajaInterna order by date_format(CajaInternaFecha, "%Y-%m-%d") desc`].join(' ')
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