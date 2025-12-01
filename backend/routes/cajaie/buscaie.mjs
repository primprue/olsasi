import express from 'express';

var router = express.Router();
import conexion from '../conexion.mjs';


router.get('/', function (req, res, next) {
    var q1
    const { FechaDesde, FechaHasta } = req.query;
    q1 = `SELECT idCajaIE as id, date_format(CajaIEFecha, "%d-%m-%Y") as CajaIEFecha,  CajaIECliente, CajaIEConcepto, CajaCPDesc, CajaIEMT,
        CajaIEMoneda, CajaIEImporte, CajaIECodIP, CajaIEImpIP, CajaIEGrabado  FROM BaseCaja.CajaIE LEFT JOIN  BaseCaja.CajaCP
        ON BaseCaja.CajaIE.CajaIECodIP = BaseCaja.CajaCP.idCajaCP
        where  DATE(BaseCaja.CajaIE.CajaIEFecha)  BETWEEN ? AND ?`

    conexion.query(q1, [FechaDesde, FechaHasta], (err, result) => {
        if (err) console.log(err);
        else {
            res.json(result);
        }
    });

});

export default router;


