import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.get('/', async (req, res) => {
    let clientenuevo = req.query.clientenuevo;
    try {
        const q = `SELECT * FROM BasesGenerales.Clientes where ClientesDesc >= ?`;
        const [result] = await conexionpool.query(q, [clientenuevo]);
        return res.json(result);
    } catch (err) {
        console.error("Error en el proceso:", err);
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});
export default router;