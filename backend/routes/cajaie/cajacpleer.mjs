import express from 'express';
const router = express.Router();
import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}


router.get('/', async (req, res) => {
    const q1 = `
    SELECT idCajaCP AS value, CajaCPDesc AS label
    FROM BaseCaja.CajaCP
  `;

    try {
        const result = await queryAsync(q1);
        res.json(result);
    } catch (err) {
        console.error('Error SQL:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener CajaCP',
            detalle: err.message
        });
    }
});
export default router;
