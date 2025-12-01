import express from 'express';

var router = express.Router();
import conexion from '../conexion.mjs';





router.get('/', function (req, res, next) {
    let q1
    let fechahoy = new Date().toISOString().split("T")[0]

    q1 = ['SELECT  CajaIEFecha, CajaIEMT, sum(CajaIEImporte) as CajaIEImporte,  CajaIEGrabado  FROM BaseCaja.CajaIE where  BaseCaja.CajaIE.CajaIEFecha = ' + fechahoy + 'group by CajaIEMT'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);

            }
            else {

                res.json(result);
            }
        });
});

export default router;