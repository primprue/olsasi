import express from 'express';

var router = express.Router();
import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}



router.get('/', async (req, res) => {


    let q1 = `SELECT idCajaIE as id, date_format(CajaIEFecha, "%d-%m-%Y") as CajaIEFecha,  CajaIECliente, CajaIEConcepto, CajaCPDesc, CajaIEMT, 
         CajaIEMoneda, CajaIEImporte, CajaIECodIP, CajaIEImpIP, CajaIEGrabado  FROM BaseCaja.CajaIE join BaseCaja.CajaCP  
         where  BaseCaja.CajaIE.CajaIEConcepto = BaseCaja.CajaCP.idCajaCP and 
         CajaIEFecha > (SELECT MAX(idCajaSaldoEfFecha) FROM BaseCaja.CajaSaldoEf)`;

    try {
        const result = await queryAsync(q1);
        res.json(result);
    } catch (err) {
        console.error('Error SQL:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en cajaieleer',
            detalle: err.message
        });
    }
});
export default router;
