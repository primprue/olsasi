import express from 'express';
var router = express.Router();
import { conexionpool } from '../conexion.mjs';




router.post('/', async (req, res) => {
    const registro = {
        TransporteDesc: req.body.TransporteDesc.toUpperCase(),
        TransporteTel1: req.body.TransporteTel1,
        TransporteTel2: req.body.TransporteTel2,
        TransporteWA: req.body.TransporteWA,
        TransporteMail: req.body.TransporteMail,
        TransporteDom: req.body.TransporteDom,
        TransporteLoc: req.body.TransporteLoc,
        TransporteDestino: req.body.TransporteDestino.toUpperCase(),
        TransporteObser: req.body.TransporteObser
    }
    try {
        const q = `INSERT INTO BasesGenerales.Transporte SET ?`;
        await conexionpool.query(q, [registro]);
        return res.status(201).json({
            leyenda: 'Transporte creado correctamente',
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