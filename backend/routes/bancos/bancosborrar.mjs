import express from 'express';
var router = express.Router();

import { conexionpool } from '../conexion.mjs';


router.delete('/', async (req, res) => {
    const id = req.query.id;
    try {
        const q = `delete from BasesGenerales.Bancos where idBancos = ?`;
        await conexionpool.query(q, [id]);
        return res.status(200).json({
            leyenda: 'Bancos eliminado correctamente',
        });
    } catch (err) {
        console.error("Error en el proceso:", err);

        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});

export default router;
