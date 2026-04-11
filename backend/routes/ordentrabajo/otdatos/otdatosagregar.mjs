import express from 'express';
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';

router.post('/', async (req, res) => {
    const nuevoValor = { "": 0 };
    const registro = {
        OTDatosTipoConf: req.body.OTDatosTipoConf,
        OTDatosDesc: req.body.OTDatosDesc,
        OTDatosOpciones: JSON.stringify(nuevoValor),
        OTDatosTipoPed: req.body.OTDatosTipoPed,
        OTDatosRequerido: req.body.OTDatosRequerido,
        OTDatosOrdenAparicion: req.body.OTDatosOrdenAparicion,
        OTDatosAncho: req.body.OTDatosAncho
    }
    try {
        const q = `INSERT INTO BasesOrdenes.OTDatos SET ?`;
        await conexionpool.query(q, [registro]);
        return res.status(201).json({
            leyenda: "OTDatos creado correctamente"
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