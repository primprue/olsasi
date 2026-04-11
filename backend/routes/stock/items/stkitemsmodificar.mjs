import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.post("/", async (req, res) => {
  const d = new Date();
  const finalDate = d.toISOString().split("T")[0];
  const idStkItems = Number(req.body.idStkItems);
  const StkItemsGrupo = Number(req.body.StkItemsGrupo);
  const StkItemsRubroAbr = req.body.StkItemsRubroAbr;
  const StkItemsDesc = req.body.StkItemsDesc;
  const StkItemsOTD = req.body.StkItemsOTD
  const StkItemsCantidad = Number(req.body.StkItemsCantidad);
  const StkItemsCantDisp = Number(req.body.StkItemsCantDisp);
  const StkItemsFAct = finalDate;
  const StkItemsMin = Number(req.body.StkItemsMin);
  const StkItemsMax = Number(req.body.StkItemsMax);
  try {
    const q = `UPDATE StkItems SET StkItemsDesc = ?, StkItemsOTD = ?, StkItemsRubroAbr = ?, StkItemsCantidad = ?, 
    StkItemsCantDisp = ?, StkItemsFAct = ?, StkItemsMin = ?, StkItemsMax = ?
    WHERE idStkItems = ? and StkItemsGrupo = ? and StkItemsRubroAbr = ?`;
    await conexionpool.query(q, [StkItemsDesc, StkItemsOTD, StkItemsRubroAbr, StkItemsCantidad,
      StkItemsCantDisp, StkItemsFAct, StkItemsMin, StkItemsMax,
      idStkItems, StkItemsGrupo, StkItemsRubroAbr]);
    return res.status(200).json({
      leyenda: 'Item actualizado correctamente',
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
