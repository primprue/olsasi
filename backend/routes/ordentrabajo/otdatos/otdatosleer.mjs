import express from 'express';
var router = express.Router();
import { conexionpool } from '../../conexion.mjs';


router.get('/', async (req, res) => {
    const indice = req.query.id;

    const q = `SELECT idOTDatos, OTDatosOrdenAparicion, OTDatosDesc, OTDatosOpciones,
    OTDatosTipoPed, OTDatosRequerido FROM BasesOrdenes.OTDatos
    where OTDatosTipoConf = ? order by OTDatosOrdenAparicion`;
    try {
        const [result] = await conexionpool.query(q, [indice]);
        res.json(result);
    } catch (err) {
        console.error("Error en el proceso:", err);
        res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});

export default router;