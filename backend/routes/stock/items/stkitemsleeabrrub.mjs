import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  try {
    const StkRubroAbr = req.query.abr;
    const q = `Select idStkItems, StkItemsDesc, StkItemsCantDisp from StkItems where StkItemsRubroAbr = ?`;
    const [result] = await conexionpool.query(q, [StkRubroAbr]);
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
