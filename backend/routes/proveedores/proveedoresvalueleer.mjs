import express from 'express';
import { conexionpool } from '../conexion.mjs';
var router = express.Router();


router.get('/', async (req, res) => {
    try {
        const q = `SELECT idProveedores as value, ProveedoresDesc as label, 
                    ProveedoresTipo FROM BasesGenerales.Proveedores
                    order by ProveedoresDesc`;
        const [result] = await conexionpool.query(q);
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