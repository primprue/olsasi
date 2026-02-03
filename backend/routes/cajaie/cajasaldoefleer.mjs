import express from 'express';

var router = express.Router();
import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.get('/', async (req, res) => {


    let q1 = `SELECT  idCajaSaldoEfFecha, CajaSaldoEfImporte, CajaSaldoEfMoneda 
    FROM BaseCaja.CajaSaldoEf WHERE
    idCajaSaldoEfFecha = (SELECT MAX(idCajaSaldoEfFecha)  
       FROM BaseCaja.CajaSaldoEf)`;
    try {
        const result = await queryAsync(q1);
        res.json(result);
    } catch (err) {
        console.error('Error SQL:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en cajasaldoefleer',
            detalle: err.message
        });
    }
});
export default router;
