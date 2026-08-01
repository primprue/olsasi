import express from 'express';
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';

router.post('/', async (req, res) => {
    const nuevoValor = { "": 0 };
    let ordenaparicion = 0;
    try {
        const q1 = `SELECT MAX(OTDatosOrdenAparicion) as orden FROM BasesOrdenes.OTDatos WHERE OTDatosTipoConf  =  ?`;
        const [rows] = await conexionpool.query(q1, req.body.OTDatosTipoConf);
        if (rows === undefined) {
            ordenaparicion = 1
        }
        else {
            ordenaparicion = rows[0].orden + 1;
        }
        const registro = {
            OTDatosTipoConf: req.body.OTDatosTipoConf,
            OTDatosDesc: req.body.OTDatosDesc,
            OTDatosOpciones: JSON.stringify(nuevoValor),
            OTDatosTipoPed: req.body.OTDatosTipoPed,
            OTDatosRequerido: req.body.OTDatosRequerido,
            OTDatosOrdenAparicion: ordenaparicion,
            OTDatosAncho: req.body.OTDatosAncho
        }
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