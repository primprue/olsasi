import express from "express";
var router = express.Router();
import { subDays } from 'date-fns';
import { conexionpool } from '../../conexion.mjs';


router.get("/", async (req, res) => {
    const StkRubroAbr = req.query.StkRubroAbr
    const StkItemsDesc = req.query.StkItemsDesc
    const resultado = subDays(new Date(), 30);
    const fechaabuscar = resultado.toISOString().split("T")[0]
    try {
        const q = `SELECT idStkMov as id, StkMovRubroAbr, StkMovItemDesc, StkMovCliente, StkMovLargo, StkMovAncho, StkMovFecha, StkMovTotal
         FROM BaseStock.StkMov where StkMovRubroAbr = ? and StkMovItemDesc = ? and StkMovFecha > ?
         and StkMovNroRef not like '%Confirma%'`
        const [result] = await conexionpool.query(q, [StkRubroAbr, StkItemsDesc, fechaabuscar]);
        res.json(result);
    } catch (err) {
        console.error("Error en la DB:", err);
        res.status(500).json({
            error: "Error al obtener los leyendas de pie de presupuesto",
            details: err.message
        });
    }

});
export default router;
