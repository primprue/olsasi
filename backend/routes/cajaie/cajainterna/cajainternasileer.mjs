import express from 'express';

var router = express.Router();
import { conexionpool } from '../../conexion.mjs';




router.get('/', async (req, res) => {
    try {
        const q1 = `SELECT idCajaInternaSI as id, 
            CajaInternaSIFecha,
            CajaInternaSIM, CajaInternaSIT
            FROM BaseCaja.CajaInternaSI
            WHERE CajaInternaSIFecha = (SELECT MAX(CajaInternaSIFecha)
            FROM BaseCaja.CajaInternaSI)`
        const [result] = await conexionpool.query(q1);
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