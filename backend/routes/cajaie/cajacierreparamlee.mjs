import express from 'express';

var router = express.Router();

import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}

router.get('/', async (req, res) => {

    let q1 = `SELECT *  FROM BaseCaja.CajaCierreParam`;

    try {
        const result = await queryAsync(q1);
        res.json(result);
    } catch (err) {
        console.error('Error SQL:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener CajaCierreParam',
            detalle: err.message
        }); // 👈 se envia el mensaje de error
    }

});

export default router;