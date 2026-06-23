import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.post("/", async (req, res) => {
    const { StkItemsRubroAbr, StkItemsDesc, StkItemsOTD, StkItemsCantidad, StkItemsMin, StkItemsMax } = req.body;

    let d = new Date();
    let finalDate = d.toISOString().split("T")[0];

    try {
        // 1. Buscamos el Grupo y el ID del Rubro basado en la abreviatura
        const queryRubro = `SELECT StkRubroCodGrp, idStkRubro FROM StkRubro WHERE StkRubroAbr = ?`;
        const [infoRubro] = await conexionpool.query(queryRubro, [StkItemsRubroAbr]);

        if (infoRubro.length === 0) {
            return res.status(404).json({ message: "El rubro especificado no existe." });
        }

        const { StkRubroCodGrp, idStkRubro } = infoRubro[0];

        // 2. Buscamos el último ID de ítem para ese rubro específico
        const queryUltimo = `SELECT MAX(idStkItems) as UltItem FROM StkItems WHERE StkItemsRubro = ?`;
        const [resultadoUltimo] = await conexionpool.query(queryUltimo, [idStkRubro]);

        // Si no hay ítems, empezamos en 1, sino sumamos 1 al máximo
        const proximoId = (resultadoUltimo[0].UltItem || 0) + 1;

        // 3. Preparamos el registro final
        const registro = {
            idStkItems: proximoId, // Generado automáticamente
            StkItemsGrupo: StkRubroCodGrp,
            StkItemsRubro: idStkRubro,
            StkItemsRubroAbr: StkItemsRubroAbr.toUpperCase(),
            StkItemsDesc: (StkItemsDesc || '').toUpperCase(),
            StkItemsOTD: (StkItemsOTD || '').toUpperCase(),
            StkItemsCantidad: Number(StkItemsCantidad || 0),
            StkItemsCantDisp: Number(StkItemsCantidad || 0), // Generalmente igual a la cant inicial
            StkItemsFAct: finalDate,
            StkItemsMin: Number(StkItemsMin || 0),
            StkItemsMax: Number(StkItemsMax || 0),
        };

        // 4. Insertamos
        await conexionpool.query("INSERT INTO StkItems SET ?", [registro]);

        return res.status(201).json({
            leyenda: 'Item creado correctamente',
            idGenerado: proximoId
        });

    } catch (err) {
        console.error("Error en el proceso:", err);
        if (err.errno === 1062) return res.status(460).json({ message: "Clave duplicada" });

        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});


export default router;