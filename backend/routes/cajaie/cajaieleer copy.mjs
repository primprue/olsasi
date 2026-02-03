import express from 'express';

var router = express.Router();
import { conexion } from '../conexion.mjs';




router.get('/', function (req, res, next) {
    let q1

    q1 = ['SELECT idCajaIE as id, date_format(CajaIEFecha, "%d-%m-%Y") as CajaIEFecha,  CajaIECliente, CajaIEConcepto, CajaCPDesc, CajaIEMT, ',
        ' CajaIEMoneda, CajaIEImporte, CajaIECodIP, CajaIEImpIP, CajaIEGrabado  FROM BaseCaja.CajaIE join BaseCaja.CajaCP  ',
        ' where  BaseCaja.CajaIE.CajaIEConcepto = BaseCaja.CajaCP.idCajaCP and ',
        ' CajaIEFecha > (SELECT MAX(idCajaSaldoEfFecha) FROM BaseCaja.CajaSaldoEf)'].join(' ')
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