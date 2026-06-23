import express from "express";
var router = express.Router();
import { conpoolserv } from '../conexion.mjs';

router.use(express.json()); // Asegúrate de que esto está habilitado para que `req.body` no sea vacío
router.post("/", async (req, res) => {
    const indice = req.query.id;
    const NumeroClienteDC = req.body.NumeroClienteDC;
    const NroClienteFacDC = req.body.NroClienteFacDC;

    try {
        const q = `update medidasclientes.datosclientesdc set NroClienteFacDC = ? 
            where NumeroClienteDC = ?`;
        await conpoolserv.query(q, [NroClienteFacDC, NumeroClienteDC]);
        return res.status(200).json({
            leyenda: 'Cliente de Medidas modificado correctamente',
        });
    } catch (err) {
        console.error("Error en el proceso:", err);
        // Manejo de errores específicos de SQL
        if (err.errno === 1062) {
            return res.status(460).json({ message: "Clave duplicada" });
        }
        if (err.errno === 1406) {
            return res.status(410).json({ message: "Dato demasiado largo para una columna" });
        }
        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }

});

export default router;
