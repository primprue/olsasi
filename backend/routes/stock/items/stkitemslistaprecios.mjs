import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  const StkItemsGrupo = req.query.idStkGrupo;
  const StkItemsRubro = req.query.idStkRubro;
  try {
    const q = `Select idStkItems as id, StkItemsDesc, StkItemsCantDisp, StkItemsCantidad from StkItems where StkItemsGrupo  = ? and  StkItemsRubro  = ?`;
    const [result] = await conexionpool.query(q, [StkItemsGrupo, StkItemsRubro]);
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
