import express from "express";
var router = express.Router();
import moment from "moment";
import { conexionpool } from '../../conexion.mjs';

moment.locale("es");

router.post("/", async (req, res) => {
    try {
        const movareg = req.body.movareg
        const d = new Date();
        let finalDate = d.toISOString().split("T")[0];



        const registro = {
            StkMovFecha: finalDate,
            StkMovLargo: Number(movareg[0].StkLargo),
            StkMovAncho: Number(movareg[0].StkAncho),
            StkMovTotal: Number(movareg[0].StkMovTotal),
            StkMovRubroAbr: movareg[0].StkMovRubroAbr,
            StkMovItemDesc: movareg[0].StkMovItemDesc,
            StkMovCliente: movareg[0].StkMovCliente,
            StkMovProv: Number(movareg[0].StkMovProv),
            StkMovNroRef: movareg[0].StkMovNroRef,
        };
        const q = `INSERT INTO BaseStock.StkMov SET ?`;
        await conexionpool.query(q, [registro]);
        return res.status(201).json({
            leyenda: 'Movimiento creado correctamente',
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
