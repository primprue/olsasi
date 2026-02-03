import express from 'express';

var router = express.Router();
// var path = require('path');
import { conexion } from '../conexion.mjs';

async function queryAsync(sql, params = []) {
    const [rows] = await conexion.promise().query(sql, params);
    return rows;
}


router.get('/', async (req, res,) => {

    let q1 = `SELECT idCajaIP as value, CajaIPDesc as label  FROM BaseCaja.CajaIP`;
    try {
        const result = await queryAsync(q1);
        res.json(result);
    } catch (err) {
        console.error('Error SQL:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en cajaipleer',
            detalle: err.message
        });
    }
});
export default router;